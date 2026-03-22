-- NextRole initial schema: profiles, resumes, jobs, interview_sessions
-- Apply with: supabase db push (linked project) or paste into Supabase SQL Editor

-- Job pipeline status (matches src/types/jobs.ts)
create type public.job_status as enum (
  'saved',
  'applied',
  'interviewing',
  'rejected',
  'offer'
);

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  career_goal text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "profiles_delete_own"
  on public.profiles for delete to authenticated
  using ((select auth.uid()) = id);

-- New auth users get a profile row (Supabase runs migrations with rights to auth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    nullif(trim(coalesce(new.raw_user_meta_data->>'first_name', '')), ''),
    nullif(trim(coalesce(new.raw_user_meta_data->>'last_name', '')), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- resumes
-- ---------------------------------------------------------------------------
create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  is_base_resume boolean not null default false,
  created_at timestamptz not null default now()
);

create index resumes_user_id_idx on public.resumes (user_id);

alter table public.resumes enable row level security;

create policy "resumes_select_own"
  on public.resumes for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "resumes_insert_own"
  on public.resumes for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "resumes_update_own"
  on public.resumes for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "resumes_delete_own"
  on public.resumes for delete to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- jobs
-- ---------------------------------------------------------------------------
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  company_name text not null,
  role_title text not null,
  job_description text,
  status public.job_status not null default 'saved',
  linked_resume_id uuid references public.resumes (id) on delete set null,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index jobs_user_id_idx on public.jobs (user_id);
create index jobs_status_idx on public.jobs (user_id, status);

alter table public.jobs enable row level security;

create policy "jobs_select_own"
  on public.jobs for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "jobs_insert_own"
  on public.jobs for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "jobs_update_own"
  on public.jobs for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "jobs_delete_own"
  on public.jobs for delete to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- interview_sessions
-- ---------------------------------------------------------------------------
create table public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete cascade,
  chat_history jsonb not null default '[]'::jsonb,
  ai_feedback text,
  created_at timestamptz not null default now()
);

create index interview_sessions_user_id_idx on public.interview_sessions (user_id);
create index interview_sessions_job_id_idx on public.interview_sessions (job_id);

alter table public.interview_sessions enable row level security;

create policy "interview_sessions_select_own"
  on public.interview_sessions for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "interview_sessions_insert_own"
  on public.interview_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "interview_sessions_update_own"
  on public.interview_sessions for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "interview_sessions_delete_own"
  on public.interview_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

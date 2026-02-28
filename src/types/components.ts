// Re-export ButtonProps from its source. ButtonProps must be declared in Button.tsx
// (co-located with buttonVariants) to avoid a circular dependency.
// All consumers should import from this file: import type { ButtonProps } from '@/types/components'
export type { ButtonProps } from '@/components/ui/Button'

import { useState } from 'react'
import { authService } from '../../../services/auth.service'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        let result
        if (isSignUp) {
            result = await authService.signUpWithEmail(email, password)
        } else {
            result = await authService.signInWithEmail(email, password)
        }

        if (result.error) {
            alert(result.error.message)
        } else if (isSignUp) {
            alert('Account created! Please sign in.')
            setIsSignUp(false)
        }
        setLoading(false)
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    {isSignUp ? 'Sign up with your email and password' : 'Sign in with your email and password'}
                </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleAuth}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        minLength={6}
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </Button>
            </form>

            <div className="text-center mt-2">
                <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
            </div>
        </div>
    )
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AnimatedBackground } from '@/components/animated-background';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status } = useSession();
    const redirectTo = searchParams.get('redirectTo') || '/dashboard';

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.push(redirectTo);
        }
    }, [status, redirectTo, router]);

    // Show loading state while checking session
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid username or password');
            } else {
                router.push(redirectTo);
                router.refresh();
            }
        } catch (error) {
            setError(`An error occurred during login: ${error}`);
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Only render login form if not authenticated
    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 relative">
                <AnimatedBackground />
                <Card className="w-full max-w-md shadow-lg z-10 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-blue-700">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-center text-purple-700">
                            Please enter your credentials to continue
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {error && (
                                <div className="bg-red-100 text-red-600 p-3 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-purple-700"
                                disabled={isLoggingIn}
                            >
                                {isLoggingIn ? (
                                    <LoadingSpinner />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return null; // Return null while redirecting
} 
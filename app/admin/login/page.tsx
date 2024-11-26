'use client';

// Make this the main page component (server component)
import { Suspense } from 'react';
import { SessionProvider } from 'next-auth/react';
import LoginForm from './login-form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function LoginPage() {
    return (
        <SessionProvider>
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            }>
                <LoginForm />
            </Suspense>
        </SessionProvider>
    );
}

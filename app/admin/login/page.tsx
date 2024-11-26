'use client';

// Make this the main page component (server component)
import { SessionProvider } from 'next-auth/react';
import LoginForm from './login-form';

export default function LoginPage() {
    return (
        <SessionProvider>
            <LoginForm />
        </SessionProvider>
    );
}

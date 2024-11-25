'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatedBackground } from '@/components/animated-background';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoggingIn(true);

		try {
			const result = await signIn('credentials', {
				username,
				password,
				redirect: false,
				callbackUrl: '/dashboard',
			});

			if (!result) {
				setError('Authentication failed');
				return;
			}

			if (result.error) {
				setError(result.error);
				return;
			}

			router.push(result.url || '/dashboard');
		} catch (err) {
			setError('An error occurred during authentication');
			console.error('Authentication error:', err);
		} finally {
			setIsLoggingIn(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
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

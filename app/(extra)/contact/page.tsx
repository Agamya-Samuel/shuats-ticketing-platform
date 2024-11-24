'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
	const router = useRouter();

	useEffect(() => {
		router.push('https://agamya.dev/');
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-lg">Redirecting to contact...</p>
		</div>
	);
}

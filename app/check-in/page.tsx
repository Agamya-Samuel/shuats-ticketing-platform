import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { CheckInScanner } from './check-in-scanner';
import { Providers } from '../providers';
import { NavBar } from '@/components/nav-bar';

export default async function CheckInPage() {
	const session = await auth();

	if (!session) {
		redirect('/admin/login?redirectTo=/check-in');
	}

	return (
		<Providers>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="min-h-screen bg-gray-100">
					<NavBar />
					<CheckInScanner />
				</div>
			</Suspense>
		</Providers>
	);
}

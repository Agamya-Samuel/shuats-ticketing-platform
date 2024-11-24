import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { NavBar } from '@/components/nav-bar';
import { DashboardClient } from '@/app/dashboard/dashboard-client';
import { Providers } from '@/app/providers';

export default async function AdminDashboard() {
	const session = await auth();

	if (!session) {
		redirect('/admin/login');
	}

	return (
		<Providers>
			<ErrorBoundary fallback={<div>Error loading dashboard</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<div className="min-h-screen bg-gray-100">
						<NavBar />
						<DashboardClient />
					</div>
				</Suspense>
			</ErrorBoundary>
		</Providers>
	);
}

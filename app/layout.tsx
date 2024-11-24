import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
	title: `Fresher's - Farewell Registration Form`,
	description: `Fresher's - Farewell Registration`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}

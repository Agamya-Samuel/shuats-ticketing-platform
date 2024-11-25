'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';

export function NavBar() {
	const { data: session, status } = useSession();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: '/admin/login' });
	};

	const LoadingSkeleton = () => (
		<div className="flex items-center">
			<Skeleton className="h-8 w-8 rounded-full" />
		</div>
	);

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) {
		return (
			<nav className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex justify-between h-16">
						<div className="flex-shrink-0 flex items-center">
							<span className="text-2xl font-bold text-blue-700">
								{process.env.NEXT_PUBLIC_EVENT_NAME || ''} Admin Panel
							</span>
						</div>
						<div className="flex items-center">
							<LoadingSkeleton />
						</div>
					</div>
				</div>
			</nav>
		);
	}

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 ">
				<div className="flex justify-between h-16">
					<div className="flex-shrink-0 flex items-center">
						<span className="text-2xl font-bold text-blue-700">
							{process.env.NEXT_PUBLIC_EVENT_NAME || ''} Admin
							Panel
						</span>
					</div>
					<div className="flex items-center">
						{status === 'loading' ? (
							<LoadingSkeleton />
						) : session ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-8 w-8 rounded-full"
									>
										<Avatar className="h-8 w-8">
											<AvatarImage
												src="/placeholder.svg?height=32&width=32"
												alt="@admin"
											/>
											<AvatarFallback>
												{session.user?.name
													?.split(' ')
													.map((n: string) => n[0])
													.join('')}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-56"
									align="end"
									forceMount
								>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{session.user?.name}
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												{session.user?.username}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleSignOut}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button className="flex items-center">
								<User className="mr-2 h-4 w-4" />
								Sign In
							</Button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

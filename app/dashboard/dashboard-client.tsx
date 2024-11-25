'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import {
	getRegistrations,
	approveRegistration,
	rejectRegistration,
	uncheckInUser,
} from '@/actions/dashboard';
import { LoadingSkeleton } from '@/app/dashboard/loading-skeleton';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Registration {
	_id: string;
	name: string;
	email: string;
	mobile: string;
	course: string;
	moneyPaid: string;
	status: string;
	approvedBy?: string;
	approvedOn?: string;
	rejectedBy?: string;
	rejectedOn?: string;
	userId: string;
	checkedIn?: boolean;
	checkedInAt?: string;
	checkedInBy?: string;
}

export function DashboardClient() {
	const { data: session } = useSession();
	const [requests, setRequests] = useState<Registration[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTab, setActiveTab] = useState('pending');
	const [isLoading, setIsLoading] = useState(true);
	const [loadingAction, setLoadingAction] = useState<string | null>(null);
	const [loadingUncheckIn, setLoadingUncheckIn] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const initialRequests = await getRegistrations();
				setRequests(initialRequests);
			} catch (error) {
				console.error('Error fetching registrations:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredRequests = requests.filter((request) => {
		const searchMatches =
			request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.mobile.includes(searchTerm);

		if (activeTab === 'checkedIn') {
			return searchMatches && request.checkedIn;
		}

		return searchMatches && request.status === activeTab;
	});

	const handleApprove = async (id: string) => {
		try {
			setLoadingAction(id + '_approve');
			const result = await approveRegistration(
				id,
				session?.user?.username || ''
			);
			if (result.success) {
				const updatedRequests = await getRegistrations();
				setRequests(updatedRequests);
				console.log('Registration approved successfully');
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.error('Error approving registration:', error);
		} finally {
			setLoadingAction(null);
		}
	};

	const handleReject = async (id: string) => {
		try {
			setLoadingAction(id + '_reject');
			const result = await rejectRegistration(
				id,
				session?.user?.username || ''
			);
			if (result.success) {
				const updatedRequests = await getRegistrations();
				setRequests(updatedRequests);
				console.log('Registration rejected successfully');
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.error('Error rejecting registration:', error);
		} finally {
			setLoadingAction(null);
		}
	};

	const handleUncheckIn = async (id: string) => {
		try {
			setLoadingUncheckIn(id);
			const result = await uncheckInUser(id);
			if (result.success) {
				const updatedRequests = await getRegistrations();
				setRequests(updatedRequests);
				console.log('User unchecked-in successfully');
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.error('Error unchecking-in user:', error);
		} finally {
			setLoadingUncheckIn(null);
		}
	};

	const calculateCounts = (requests: Registration[]) => {
		return {
			total: requests.length,
				pending: requests.filter((r) => r.status === 'pending').length,
				accepted: requests.filter((r) => r.status === 'accepted').length,
				rejected: requests.filter((r) => r.status === 'rejected').length,
				checkedIn: requests.filter((r) => r.checkedIn).length,
		};
	};

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	const counts = calculateCounts(requests);

	return (
		<div className="container mx-auto p-4 max-w-7xl">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
				<h1 className="text-2xl font-bold">
					{process.env.NEXT_PUBLIC_EVENT_NAME} Registration Requests
				</h1>
				<div className="text-2xl text-gray-600 mt-2 md:mt-0">
					Total Registrations:{' '}
					<span className="font-semibold">{counts.total}</span>
				</div>
			</div>
			<Tabs
				defaultValue="pending"
				className="mb-4"
				onValueChange={(value) => setActiveTab(value)}
			>
				<TabsList className="grid w-full grid-cols-4 bg-slate-200">
					<TabsTrigger value="pending">
						Pending ({counts.pending})
					</TabsTrigger>
					<TabsTrigger value="accepted">
						Accepted ({counts.accepted})
					</TabsTrigger>
					<TabsTrigger value="rejected">
						Rejected ({counts.rejected})
					</TabsTrigger>
					<TabsTrigger value="checkedIn">
						Checked In ({counts.checkedIn})
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="mb-4 relative ">
				<Input
					type="text"
					placeholder="Search by name, email, or mobile"
					value={searchTerm}
					onChange={handleSearch}
					className="pl-10 h-14"
				/>
				<Search
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					size={20}
				/>
			</div>
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px] font-semibold">
									Name
								</TableHead>
								<TableHead className="w-[120px] font-semibold">
									College ID
								</TableHead>
								<TableHead className="w-[100px] font-semibold">
									Course
								</TableHead>
								<TableHead className="w-[200px] font-semibold">
									Email
								</TableHead>
								<TableHead className="w-[120px] font-semibold">
									Mobile
								</TableHead>
								{activeTab === 'checkedIn' && (
									<>
										<TableHead className="w-[150px] font-semibold">
											Checked In At
										</TableHead>
										<TableHead className="w-[150px] font-semibold">
											Checked In By
										</TableHead>
									</>
								)}
								<TableHead className="w-[120px] font-semibold">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredRequests.map((request) => (
								<TableRow key={request._id}>
									<TableCell className="font-medium">
										{request.name}
									</TableCell>
									<TableCell>{request.userId}</TableCell>
									<TableCell>{request.course}</TableCell>
									<TableCell>{request.email}</TableCell>
									<TableCell>{request.mobile}</TableCell>
									{activeTab === 'checkedIn' && (
										<>
											<TableCell>
												{request.checkedInAt ? new Date(request.checkedInAt).toLocaleString() : ''}
											</TableCell>
											<TableCell>
												{request.checkedInBy}
											</TableCell>
										</>
									)}
									<TableCell>
										{activeTab === 'checkedIn' && (
											<Button
												onClick={() => handleUncheckIn(request._id)}
												size="sm"
												className="bg-red-500 hover:bg-red-600"
												disabled={loadingUncheckIn === request._id}
											>
												{loadingUncheckIn === request._id ? (
													<LoadingSpinner />
												) : (
													<XCircle
														className="mr-1"
														size={16}
													/>
												)}
												Uncheck In
											</Button>
										)}
										{activeTab === 'pending' && (
											<div className="flex space-x-2">
												<Button
													onClick={() =>
														handleApprove(
															request._id
														)
													}
													size="sm"
													className="bg-green-500 hover:bg-green-600"
													disabled={loadingAction === request._id + '_approve'}
												>
													{loadingAction === request._id + '_approve' ? (
														<LoadingSpinner />
													) : (
														<CheckCircle
															className="mr-1"
															size={16}
														/>
													)}
													Approve
												</Button>
												<Button
													onClick={() =>
														handleReject(
															request._id
														)
													}
													size="sm"
													className="bg-red-500 hover:bg-red-600"
													disabled={loadingAction === request._id + '_reject'}
												>
													{loadingAction === request._id + '_reject' ? (
														<LoadingSpinner />
													) : (
														<XCircle
															className="mr-1"
															size={16}
														/>
													)}
													Reject
												</Button>
											</div>
										)}
										{activeTab === 'accepted' && (
											<Button
												onClick={() => handleReject(request._id)}
												size="sm"
												className="bg-red-500 hover:bg-red-600"
												disabled={loadingAction === request._id + '_reject'}
											>
												{loadingAction === request._id + '_reject' ? (
													<LoadingSpinner />
												) : (
													<XCircle className="mr-1" size={16} />
												)}
												Reject
											</Button>
										)}
										{activeTab === 'rejected' && (
											<Button
												onClick={() => handleApprove(request._id)}
												size="sm"
												className="bg-green-500 hover:bg-green-600"
												disabled={loadingAction === request._id + '_approve'}
											>
												{loadingAction === request._id + '_approve' ? (
													<LoadingSpinner />
												) : (
													<CheckCircle className="mr-1" size={16} />
												)}
												Approve
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}

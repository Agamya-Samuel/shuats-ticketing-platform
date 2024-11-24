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
} from '@/actions/dashboard';
import { LoadingSkeleton } from '@/app/dashboard/loading-skeleton';
import { useSession } from 'next-auth/react';

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
}

export function DashboardClient() {
	const { data: session } = useSession();
	const [requests, setRequests] = useState<Registration[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTab, setActiveTab] = useState('pending');
	const [isLoading, setIsLoading] = useState(true);

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

	const filteredRequests = requests.filter(
		(request) =>
			(request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				request.email
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				request.mobile.includes(searchTerm)) &&
			request.status === activeTab
	);

	const handleApprove = async (id: string) => {
		try {
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
		}
	};

	const handleReject = async (id: string) => {
		try {
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
		}
	};

	const calculateCounts = (requests: Registration[]) => {
		return {
			pending: requests.filter(r => r.status === 'pending').length,
			accepted: requests.filter(r => r.status === 'accepted').length,
			rejected: requests.filter(r => r.status === 'rejected').length
		};
	};

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	const counts = calculateCounts(requests);

	return (
		<div className="container mx-auto p-4 max-w-7xl">
			<h1 className="text-2xl font-bold mb-4">
				{process.env.NEXT_PUBLIC_EVENT_NAME} Registration Requests
			</h1>
			<Tabs
				defaultValue="pending"
				className="mb-4"
				onValueChange={(value) => setActiveTab(value)}
			>
				<TabsList className="grid w-full grid-cols-3 bg-slate-200">
					<TabsTrigger value="pending">
						Pending ({counts.pending})
					</TabsTrigger>
					<TabsTrigger value="accepted">
						Accepted ({counts.accepted})
					</TabsTrigger>
					<TabsTrigger value="rejected">
						Rejected ({counts.rejected})
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
								<TableHead className="w-[150px] text-lg font-semibold">
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
								<TableHead className="w-[100px] font-semibold">
									Money Paid
								</TableHead>
								{activeTab === 'accepted' && (
									<>
										<TableHead className="w-[120px] font-semibold">
											Approved By
										</TableHead>
										<TableHead className="w-[120px] font-semibold">
											Approved On
										</TableHead>
									</>
								)}
								{activeTab === 'rejected' && (
									<>
										<TableHead className="w-[120px] font-semibold">
											Rejected By
										</TableHead>
										<TableHead className="w-[120px] font-semibold">
											Rejected On
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
									<TableCell>₹{request.moneyPaid}</TableCell>
									{activeTab === 'accepted' && (
										<>
											<TableCell>
												{request.approvedBy}
											</TableCell>
											<TableCell>
												{request.approvedOn}
											</TableCell>
										</>
									)}
									{activeTab === 'rejected' && (
										<>
											<TableCell>
												{request.rejectedBy}
											</TableCell>
											<TableCell>
												{request.rejectedOn}
											</TableCell>
										</>
									)}
									<TableCell>
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
												>
													<CheckCircle
														className="mr-1"
														size={16}
													/>
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
												>
													<XCircle
														className="mr-1"
														size={16}
													/>
													Reject
												</Button>
											</div>
										)}
										{activeTab === 'accepted' && (
											<Button
												onClick={() =>
													handleReject(request._id)
												}
												size="sm"
												className="bg-red-500 hover:bg-red-600"
											>
												<XCircle
													className="mr-1"
													size={16}
												/>
												Reject
											</Button>
										)}
										{activeTab === 'rejected' && (
											<Button
												onClick={() =>
													handleApprove(request._id)
												}
												size="sm"
												className="bg-green-500 hover:bg-green-600"
											>
												<CheckCircle
													className="mr-1"
													size={16}
												/>
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

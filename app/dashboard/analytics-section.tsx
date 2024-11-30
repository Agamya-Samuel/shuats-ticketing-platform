import React from 'react';
import {
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Registration {
	_id: string;
	status: string;
	approvedOn?: string;
	checkedIn?: boolean;
}

interface AnalyticsSectionProps {
	registrations: Registration[];
}

export function AnalyticsSection({ registrations }: AnalyticsSectionProps) {
	// Calculate status distribution
	const statusData = [
		{
			name: 'Pending',
			value: registrations.filter((r) => r.status === 'pending').length,
		},
		{
			name: 'Approved',
			value: registrations.filter((r) => r.status === 'accepted').length,
		},
		{
			name: 'Rejected',
			value: registrations.filter((r) => r.status === 'rejected').length,
		},
	];

	// Calculate check-in rate
	const approvedCount = registrations.filter(
		(r) => r.status === 'accepted'
	).length;
	const checkedInCount = registrations.filter((r) => r.checkedIn).length;
	const checkInData = [
		{ name: 'Checked In', value: checkedInCount },
		{ name: 'Not Checked In', value: approvedCount - checkedInCount },
	];
	// Calculate registrations over time
	const registrationsByDate = registrations.reduce((acc: Record<string, number>, reg) => {
		const date = reg.approvedOn
			? new Date(reg.approvedOn).toLocaleDateString()
			: 'Pending';
		acc[date] = (acc[date] || 0) + 1;
		return acc;
	}, {});

	const timelineData = Object.entries(registrationsByDate).map(
		([date, count]) => ({
			date,
			count,
		})
	);

	const COLORS = ['#0088FE', '#00C49F', '#EF4444', '#FF8042', '#FFBB28'];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
			{/* Registration Status */}
			<Card>
				<CardHeader>
					<CardTitle>Registration Status</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[250px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={statusData}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label
								>
									{statusData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Check-in Rate */}
			<Card>
				<CardHeader>
					<CardTitle>Check-in Rate</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[250px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={checkInData}
									cx="50%"
									cy="50%"
									startAngle={90}
									endAngle={-270}
									innerRadius={60}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label
								>
									{checkInData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Registrations Timeline */}
			<Card className="md:col-span-2 lg:col-span-1">
				<CardHeader>
					<CardTitle>Registrations Over Time</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[250px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={timelineData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="count" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
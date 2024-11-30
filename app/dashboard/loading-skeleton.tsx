import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LoadingSkeleton() {
	return (
		<div className="container mx-auto p-4 max-w-7xl">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
				<Skeleton className="h-8 w-64" />
				<Skeleton className="h-8 w-48 mt-2 md:mt-0" />
			</div>

			{/* Analytics Section */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
				{/* Registration Status Card */}
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-40" />
					</CardHeader>
					<CardContent>
						<div className="h-[250px] flex items-center justify-center">
							<Skeleton className="h-[160px] w-[160px] rounded-full" />
						</div>
					</CardContent>
				</Card>

				{/* Check-in Rate Card */}
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent>
						<div className="h-[250px] flex items-center justify-center">
							<Skeleton className="h-[160px] w-[160px] rounded-full" />
						</div>
					</CardContent>
				</Card>

				{/* Registrations Timeline Card */}
				<Card className="md:col-span-2 lg:col-span-1">
					<CardHeader>
						<Skeleton className="h-6 w-48" />
					</CardHeader>
					<CardContent>
						<div className="h-[250px]">
							<Skeleton className="h-full w-full" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Table Section */}
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[200px]">
									<Skeleton className="h-4 w-24" />
								</TableHead>
								<TableHead className="w-[120px]">
									<Skeleton className="h-4 w-16" />
								</TableHead>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-16" />
								</TableHead>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[120px]">
									<Skeleton className="h-4 w-16" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[...Array(5)].map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-4 w-24" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-32" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-20" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-16" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-16" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Skeleton className="h-8 w-20" />
											<Skeleton className="h-8 w-20" />
										</div>
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

import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export function LoadingSkeleton() {
	return (
		<div className="container mx-auto p-4 max-w-7xl">
			<Skeleton className="h-8 w-64 mb-4" />
			<Skeleton className="h-10 w-full mb-4" />
			<Skeleton className="h-14 w-full mb-4" />

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

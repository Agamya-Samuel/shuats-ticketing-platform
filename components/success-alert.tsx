import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SuccessAlertProps {
	open: boolean;
	onAction: () => void;
}

export function SuccessAlert({ open, onAction }: SuccessAlertProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Registration Successful!
					</AlertDialogTitle>
					<AlertDialogDescription>
						Your registration has been submitted successfully.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={onAction}
						className="bg-blue-700 hover:bg-purple-700 text-white"
					>
						OK
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

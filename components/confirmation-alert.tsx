import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfirmationAlertProps {
	open: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmationAlert({
	open,
	onConfirm,
	onCancel,
}: ConfirmationAlertProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Submission</AlertDialogTitle>
					<AlertDialogDescription>
						Have you completed the payment? Please only proceed if
						you have made the payment.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={onCancel}
						className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
					>
						No, Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className="bg-green-500 hover:bg-green-600 text-white"
					>
						Yes, Submit
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

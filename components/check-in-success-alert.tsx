import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CheckCircle2 } from 'lucide-react';

interface CheckInSuccessAlertProps {
	open: boolean;
	onClose: () => void;
	userName: string;
}

export function CheckInSuccessAlert({
	open,
	onClose,
	userName,
}: CheckInSuccessAlertProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center flex items-center justify-center gap-2">
						<CheckCircle2 className="h-6 w-6 text-green-500" />
						<span>Check-in Successful!</span>
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center mt-2">
						{userName} has been successfully checked in.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="sm:justify-center">
					<AlertDialogAction
						onClick={()=>{
							onClose();
							window.location.reload();
						}}
						className="bg-green-500 hover:bg-green-600"
					>
						OK
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

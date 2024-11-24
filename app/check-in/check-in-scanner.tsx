'use client';

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
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
import { Button } from '@/components/ui/button';
import { CheckInSuccessAlert } from '@/components/check-in-success-alert';

interface UserInfo {
	_id: string;
	name: string;
	userId: string;
	course: string;
	mobile: string;
	checkedIn: boolean;
}

export function CheckInScanner() {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [showDialog, setShowDialog] = useState(false);
	const [showScanner, setShowScanner] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [checkedInUserName, setCheckedInUserName] = useState('');
	const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

	useEffect(() => {
		if (!showScanner) return;

		const qrScanner = new Html5QrcodeScanner(
			'reader',
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			false
		);
		setScanner(qrScanner);

		qrScanner.render(onScanSuccess, onScanFailure);

		return () => {
			qrScanner.clear();
		};
	}, [showScanner]);

	const onScanSuccess = async (decodedText: string) => {
		try {
			const [userId] = decodedText.split(':');

			const response = await fetch('/api/check-in', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId }),
			});

			const data = await response.json();

			if (!data.success) {
				setError(data.error);
				return;
			}

			setUserInfo(data.user);
			setShowDialog(true);
		} catch (error) {
			setError(`Failed to process QR code: ${error}`);
		}
	};

	const onScanFailure = (errorMessage: string) => {
		if (!errorMessage.includes('NotFoundException')) {
			setError('Unable to scan QR code. Please try again.');
		}
	};

	const handleCheckIn = async () => {
		if (!userInfo) return;

		try {
			const response = await fetch('/api/check-in/confirm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId: userInfo._id }),
			});

			const data = await response.json();

			if (data.success) {
				setError(null);
				setShowDialog(false);
				setCheckedInUserName(userInfo.name);
				setShowSuccessAlert(true);
			} else {
				setError(data.error);
			}
		} catch (error) {
			setError(`Failed to check in user: ${error}`);
		}
	};

	const handleStartScanning = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});
			stream.getTracks().forEach((track) => track.stop());
			setShowScanner(true);
			setError(null);
		} catch (err) {
			setError(
				`Camera permission denied. Please allow camera access and try again. ${err}`
			);
		}
	};

	return (
		<div className="container mx-auto p-4 min-h-screen max-w-3xl flex flex-col items-center justify-start">
			<h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
				Event Check-in
			</h1>

			{error && (
				<div className="w-full max-w-[700px] bg-red-100 text-red-600 p-4 rounded-lg mb-6 text-center text-sm md:text-base">
					{error}
				</div>
			)}

			{!showScanner ? (
				<div className="flex justify-center mb-6">
					<Button
						onClick={handleStartScanning}
						className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md text-lg"
					>
						Start Camera Scanner
					</Button>
				</div>
			) : (
				<div className="w-full max-w-[700px] mb-6">
					<div
						id="reader"
						className="overflow-hidden rounded-lg shadow-md"
					></div>
				</div>
			)}

			<AlertDialog open={showDialog}>
				<AlertDialogContent className="max-w-[90vw] md:max-w-[700px]">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl md:text-2xl text-center">
							Confirm Check-in
						</AlertDialogTitle>
						<AlertDialogDescription>
							{userInfo && (
								<>
									<span className="block space-y-3 mt-4 text-sm md:text-base">
										<span className="grid grid-cols-3 gap-2 items-center">
											<span className="font-semibold text-right pr-4">
												Name:
											</span>
											<span className="col-span-2">
												{userInfo.name}
											</span>
										</span>
										<span className="grid grid-cols-3 gap-2 items-center">
											<span className="font-semibold text-right pr-4">
												ID:
											</span>
											<span className="col-span-2">
												{userInfo.userId}
											</span>
										</span>
										<span className="grid grid-cols-3 gap-2 items-center">
											<span className="font-semibold text-right pr-4">
												Course:
											</span>
											<span className="col-span-2">
												{userInfo.course}
											</span>
										</span>
										<span className="grid grid-cols-3 gap-2 items-center">
											<span className="font-semibold text-right pr-4">
												Mobile:
											</span>
											<span className="col-span-2">
												{userInfo.mobile}
											</span>
										</span>
										{userInfo.checkedIn && (
											<span className="grid gap-2 items-center text-red-500 font-medium text-center py-2 bg-red-50 rounded-md mt-4">
												User has already checked in!
											</span>
										)}
									</span>
								</>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6 gap-3 sm:gap-0">
						<AlertDialogCancel
							onClick={() => setShowDialog(false)}
							className="w-full sm:w-auto"
						>
							Cancel
						</AlertDialogCancel>
						{!userInfo?.checkedIn && (
							<AlertDialogAction
								onClick={handleCheckIn}
								className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800"
							>
								Check In
							</AlertDialogAction>
						)}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<CheckInSuccessAlert
				open={showSuccessAlert}
				onClose={() => {
					setShowSuccessAlert(false);
					setUserInfo(null);
					if (scanner) {
						scanner.render(onScanSuccess, onScanFailure);
					}
				}}
				userName={checkedInUserName}
			/>
		</div>
	);
}

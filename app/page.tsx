'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { createRegistration } from '@/actions/registration';
import { AnimatedBackground } from '@/components/animated-background';
import { RegistrationFormFields } from '@/components/registration-form-fields';
import {
	RegistrationFormData,
	registrationFormSchema,
} from '@/schemas/registration-schema';
import { SuccessAlert } from '@/components/success-alert';
import { ConfirmationAlert } from '@/components/confirmation-alert';

export default function RegistrationForm() {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		
		reset,
		setValue,
		watch,
		setError,
	} = useForm<RegistrationFormData>({
		resolver: zodResolver(registrationFormSchema),
		defaultValues: {
			name: '',
			email: '',
			mobile: '',
			userId: '',
			course: undefined,
			moneyPaid: undefined,
		},
	});

	const onSubmit = async (data: RegistrationFormData) => {
		try {
			setServerError(null);
			const result = await createRegistration(data);

			if (result.success) {
				reset();
				setShowSuccess(true);
			} else {
				if (result.error === 'This College ID is already registered') {
					setError('userId', { message: result.error });
				} else {
					setServerError(result.error || 'An unexpected error occurred');
				}
			}
		} catch (error) {
			console.error('Submission error:', error);
			setServerError('An unexpected error occurred');
		}
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowConfirmation(true);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
			<AnimatedBackground />

			<Card className="w-full max-w-md shadow-lg z-10 bg-white/80 backdrop-blur-sm">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center text-blue-700">
						{process.env.NEXT_PUBLIC_EVENT_NAME} Event Registration
					</CardTitle>
					<CardDescription className="text-center text-red-600 text-base">
						Please fill the form ONLY if you have made payment ✅
						<br />
						[don&apos;t fill the form if you have not made the
						payment, we verify payment before confirming your
						registration]
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleFormSubmit}>
					<CardContent className="grid gap-4">
						{serverError && (
							<div className="bg-red-100 text-red-600 p-3 rounded">
								{serverError}
							</div>
						)}
						<RegistrationFormFields
							register={register}
							setValue={setValue}
							watch={watch}
							errors={errors}
						/>
					</CardContent>

					<CardFooter>
						<Button
							className="w-full bg-blue-700 hover:bg-purple-700"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Submitting...
								</>
							) : (
								'Submit Registration'
							)}
						</Button>
					</CardFooter>
				</form>
			</Card>

			<ConfirmationAlert
				open={showConfirmation}
				onConfirm={() => {
					setShowConfirmation(false);
					handleSubmit(onSubmit)();
				}}
				onCancel={() => setShowConfirmation(false)}
			/>

			<SuccessAlert
				open={showSuccess}
				onAction={() => {
					setShowSuccess(false);
					window.location.reload();
				}}
				/>
		</div>
	);
}

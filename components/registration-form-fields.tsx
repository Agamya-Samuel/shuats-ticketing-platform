import React from 'react';
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/form-field';
import { RegistrationFormData } from '@/schemas/registration-schema';
import {
	courseOptions,
	moneyPaidOptions,
} from '@/schemas/registration-schema';

interface RegistrationFormFieldsProps {
	register: UseFormRegister<RegistrationFormData>;
	setValue: UseFormSetValue<RegistrationFormData>;
	watch: UseFormWatch<RegistrationFormData>;
	errors: Record<string, { message?: string }>;
}

export function RegistrationFormFields({
	register,
	setValue,
	watch,
	errors,
}: RegistrationFormFieldsProps) {
	return (
		<>
			<FormField label="Name" error={errors.name?.message}>
				<Input
					{...register('name')}
					// placeholder="Enter your full name. Eg. Agamya Samuel"
					placeholder="Enter your full name"
				/>
			</FormField>

			<FormField label="College ID" error={errors.userId?.message}>
				<Input
					{...register('userId')}
					placeholder="Enter your College ID. Eg. 22BTCSE001"
				/>
			</FormField>

			<FormField
				label="College Email ID (we will send you tickets to this email)"
				error={errors.email?.message}
			>
				<Input
					type="email"
					{...register('email')}
					placeholder="Enter your email. Eg. 22btcse001@shiats.edu.in"
				/>
			</FormField>

			<FormField label="Mobile" error={errors.mobile?.message}>
				<Input
					{...register('mobile')}
					placeholder="Enter your mobile number"
				/>
			</FormField>

			<FormField label="Course" error={errors.course?.message}>
				<Select
					onValueChange={(value) =>
						setValue(
							'course',
							value as RegistrationFormData['course']
						)
					}
					value={watch('course')}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select your course" />
					</SelectTrigger>
					<SelectContent>
						{courseOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormField>

			<FormField label="Money Paid" error={errors.moneyPaid?.message}>
				<Select
					onValueChange={(value) =>
						setValue(
							'moneyPaid',
							value as RegistrationFormData['moneyPaid']
						)
					}
					value={watch('moneyPaid')}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select amount paid" />
					</SelectTrigger>
					<SelectContent>
						{moneyPaidOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormField>
		</>
	);
}

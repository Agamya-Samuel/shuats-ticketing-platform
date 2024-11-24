import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
	label: string;
	error?: string;
	children: React.ReactNode;
}

export const FormField = React.memo(
	({ label, error, children }: FormFieldProps) => (
		<div className="grid gap-2">
			<Label>{label}</Label>
			{children}
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	)
);

FormField.displayName = 'FormField';

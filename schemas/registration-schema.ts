import * as z from 'zod';
import { checkUserIdExists } from '@/actions/registration';

export const courseOptions = [
	{ label: 'BTech CSE 1st Year', value: 'btech_cse_1st_year' },
	{ label: 'BTech CSE 2nd Year', value: 'btech_cse_2nd_year' },
	{ label: 'BTech CSE 3rd Year', value: 'btech_cse_3rd_year' },
	{ label: 'BTech CSE 4th Year', value: 'btech_cse_4th_year' },
	{ label: 'BCA 1st Year', value: 'bca_1st_year' },
	{ label: 'BCA 2nd Year', value: 'bca_2nd_year' },
	{ label: 'BCA 3rd Year', value: 'bca_3rd_year' },
	{ label: 'MCA 1st Year', value: 'mca_1st_year' },
	{ label: 'MCA 2nd Year', value: 'mca_2nd_year' },
	{ label: 'BSc 1st Year', value: 'bsc_1st_year' },
	{ label: 'BSc 2nd Year', value: 'bsc_2nd_year' },
	{ label: 'BSc 3rd Year', value: 'bsc_3rd_year' },
	{ label: 'BTech ECE 1st Year', value: 'btech_ece_1st_year' },
	{ label: 'BTech ECE 2nd Year', value: 'btech_ece_2nd_year' },
	{ label: 'BTech ECE 3rd Year', value: 'btech_ece_3rd_year' },
	{ label: 'BTech ECE 4th Year', value: 'btech_ece_4th_year' },
	{ label: 'BTech EE 1st Year', value: 'btech_ee_1st_year' },
	{ label: 'BTech EE 2nd Year', value: 'btech_ee_2nd_year' },
	{ label: 'BTech EE 3rd Year', value: 'btech_ee_3rd_year' },
	{ label: 'BTech EE 4th Year', value: 'btech_ee_4th_year' },
	{ label: 'Other', value: 'other' },
];

export const moneyPaidOptions = [{ label: '₹500', value: '500' }];

export const registrationFormSchema = z
	.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		userId: z
			.string()
			.min(2, 'User ID must be at least 2 characters')
			.max(20, 'User ID cannot exceed 20 characters')
			.refine(
				async (userId) => !(await checkUserIdExists(userId)),
				'This College ID is already registered'
			),
		email: z.string().email('Please enter a valid email address'),
		mobile: z
			.string()
			.min(10, 'Mobile number must be at least 10 digits')
			.max(10, 'Mobile number cannot exceed 10 digits')
			.regex(/^\d+$/, 'Mobile number must contain only digits'),
		course: z.enum(
			courseOptions.map((option) => option.value) as [string, ...string[]]
		),
		moneyPaid: z.enum(
			moneyPaidOptions.map((option) => option.value) as [string, ...string[]]
		),
	})
	.refine(
		(data) => {
			const emailPrefix = data.email.split('@')[0].toLowerCase();
			const userId = data.userId.toLowerCase();
			return emailPrefix === userId;
		},
		{
			message: 'Email ID must match your College ID',
			path: ['email'],
		}
	);

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

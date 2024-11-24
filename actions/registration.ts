'use server';

import { connectDB } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { Registration } from '@/models/Registration';

export async function checkUserIdExists(userId: string) {
	try {
		await connectDB();
		const existingRegistration = await Registration.findOne({ userId });
		return existingRegistration !== null;
	} catch (error) {
		console.error('Error checking userId:', error);
		throw new Error('Failed to check userId');
	}
}
export async function createRegistration(data: {
	name: string;
	email: string;
	mobile: string;
	userId: string;
	course: string;
	moneyPaid: string;
}) {
	try {
		await connectDB();
		data.userId = data.userId.toUpperCase();

		const exists = await checkUserIdExists(data.userId);
		if (exists) {
			return { 
				success: false, 
				error: 'This College ID is already registered' 
			};
		}

		const registration = await Registration.create({
			...data,
			status: 'pending',
		});

		const plainRegistration = JSON.parse(JSON.stringify(registration));

		revalidatePath('/');
		revalidatePath('/dashboard');

		return { success: true, data: plainRegistration };
	} catch (error) {
		console.error('Registration error:', error);
		return { success: false, error: 'Failed to submit registration' };
	}
}

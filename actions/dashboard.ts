'use server';

import { connectDB } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { Registration } from '@/models/Registration';
import { sendApprovalEmail, sendRejectionEmail } from '@/actions/email';
import { ApprovedUser } from '@/models/ApprovedUser';

export async function getRegistrations() {
	await connectDB();
	const registrations = await Registration.find({}).sort({ createdAt: -1 });
	const approvedUsers = await ApprovedUser.find({});

	const registrationsWithCheckIn = registrations.map((reg) => {
		const approvedUser = approvedUsers.find(
			(au) => au.userId === reg._id.toString()
		);
		return {
			...reg.toObject(),
			checkedIn: approvedUser?.checkedIn || false,
			checkedInAt: approvedUser?.checkedInAt || null,
			checkedInBy: approvedUser?.checkedInBy || null,
		};
	});

	return JSON.parse(JSON.stringify(registrationsWithCheckIn));
}

export async function approveRegistration(id: string, adminUsername: string) {
	try {
		await connectDB();
		const registration = await Registration.findByIdAndUpdate(
			id,
			{
				status: 'accepted',
				approvedBy: adminUsername,
				approvedOn: new Date(),
				rejectedBy: null,
				rejectedOn: null,
			},
			{ new: true }
		);

		if (registration) {
			await ApprovedUser.create({
				userId: registration._id.toString(),
				name: registration.name,
			});

			await sendApprovalEmail(
				registration.name,
				registration.email,
				registration.userId,
				registration.course,
				registration.mobile,
				registration._id.toString()
			);
		}

		revalidatePath('/dashboard');
		return {
			success: true,
			data: JSON.parse(JSON.stringify(registration)),
		};
	} catch (error) {
		console.error('Approval error:', error);
		return { success: false, error: 'Failed to approve registration' };
	}
}

export async function rejectRegistration(id: string, adminUsername: string) {
	try {
		await connectDB();
		const registration = await Registration.findByIdAndUpdate(
			id,
			{
				status: 'rejected',
				rejectedBy: adminUsername,
				rejectedOn: new Date(),
				approvedBy: null,
				approvedOn: null,
			},
			{ new: true }
		);

		if (registration) {
			await ApprovedUser.deleteOne({
				userId: registration._id.toString(),
			});

				await sendRejectionEmail(
					registration.name,
					registration.email,
					registration.course
				);
		}

		revalidatePath('/dashboard');
		return {
			success: true,
			data: JSON.parse(JSON.stringify(registration)),
		};
	} catch (error) {
		console.error('Rejection error:', error);
		return { success: false, error: 'Failed to reject registration' };
	}
}

export async function uncheckInUser(id: string) {
	try {
		await connectDB();
		await ApprovedUser.updateOne(
			{ userId: id },
			{
				checkedIn: false,
				checkedInAt: null,
			}
		);
		revalidatePath('/dashboard');
		revalidatePath('/dashboard');
		return { success: true };
	} catch (error) {
		console.error('Uncheck-in error:', error);
		return { success: false, error: 'Failed to uncheck-in user' };
	}
}

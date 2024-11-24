import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ApprovedUser } from '@/models/ApprovedUser';
import { Registration } from '@/models/Registration';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
	try {
		const { userId } = await request.json();
		await connectDB();

		// Check if user is approved
		const approvedUser = await ApprovedUser.findOne({ userId });
		if (!approvedUser) {
			return NextResponse.json({
				success: false,
				error: 'User not found in approved list',
			});
		}

		// Get user details from registration
		const registration = await Registration.findOne({
			_id: ObjectId.createFromHexString(userId),
		});
		if (!registration) {
			return NextResponse.json({
				success: false,
				error: 'Registration not found',
			});
		}

		return NextResponse.json({
			success: true,
			user: {
				name: registration.name,
				userId: registration.userId,
				course: registration.course,
				mobile: registration.mobile,
				checkedIn: approvedUser.checkedIn,
			},
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			error: `Failed to process check-in: ${error}`,
		});
	}
}

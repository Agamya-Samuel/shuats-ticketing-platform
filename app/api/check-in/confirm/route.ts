import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ApprovedUser } from '@/models/ApprovedUser';

export async function POST(request: Request) {
	try {
		const { userId, checkedInBy } = await request.json();
		await connectDB();

		const approvedUser = await ApprovedUser.findOne({ userId });
		if (!approvedUser) {
			return NextResponse.json({
				success: false,
				error: 'User not found in approved list',
			});
		}

		if (approvedUser.checkedIn) {
			return NextResponse.json({
				success: false,
				error: 'User has already checked in',
			});
		}

		await ApprovedUser.updateOne(
			{ userId },
			{
				checkedIn: true,
				checkedInAt: new Date(),
				checkedInBy: checkedInBy
			}
		);

		return NextResponse.json({
			success: true,
			message: 'Check-in successful',
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			error: `Failed to confirm check-in: ${error}`,
		});
	}
}

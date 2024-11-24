import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Registration } from '@/models/Registration';

export async function DELETE(request: Request) {
	try {
		const secretCode: string = process.env.SECRET_CODE || '';
		const authHeader = request.headers.get('Authorization');
		console.log(authHeader);
		if (!authHeader || !authHeader.includes(secretCode)) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Connect to database
		await connectDB();

		// Delete all registrations
		const result = await Registration.deleteMany({});

		return NextResponse.json(
			{
				message: 'All registrations cleared successfully',
				deletedCount: result.deletedCount,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error clearing registrations:', error);

		if (error instanceof Error) {
			return NextResponse.json(
				{ error: `Failed to clear registrations: ${error.message}` },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to clear registrations' },
			{ status: 500 }
		);
	}
}

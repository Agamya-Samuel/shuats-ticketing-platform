import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';

interface AdminRequest {
	username: string;
	name: string;
	password: string;
}

export async function POST(request: Request) {
	const secretCode: string = process.env.SECRET_CODE || '';
	const authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.includes(secretCode)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	try {
		const {
			username,
			name,
			password: rawPassword,
		} = (await request.json()) as AdminRequest;

		// Validate required fields
		if (!username?.trim() || !name?.trim() || !rawPassword?.trim()) {
			return NextResponse.json(
				{ error: 'All fields are required and cannot be empty' },
				{ status: 400 }
			);
		}

		// Validate username and password requirements
		if (username.length < 3) {
			return NextResponse.json(
				{ error: 'Username must be at least 3 characters long' },
				{ status: 400 }
			);
		}

		if (rawPassword.length < 8) {
			return NextResponse.json(
				{ error: 'Password must be at least 8 characters long' },
				{ status: 400 }
			);
		}

		await connectDB();

		// Check if admin already exists
		const existingAdmin = await Admin.findOne({ username });
		if (existingAdmin) {
			return NextResponse.json(
				{ error: 'Admin already exists' },
				{ status: 400 }
			);
		}
		// Hash password
		const hashedPassword: string = await bcrypt.hash(rawPassword, 12);
		// Create new admin
		const admin = await Admin.create({
			username: username.trim(),
			name: name.trim(),
			password: hashedPassword,
		} as { username: string; name: string; password: string });

		// Remove password from response
		const adminWithoutPassword = {
			username: admin.username,
			name: admin.name,
			createdAt: admin.createdAt,
		};

		return NextResponse.json(
			{
				message: 'Admin created successfully',
				admin: adminWithoutPassword,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating admin:', error);

		// More specific error handling
		if (error instanceof Error) {
			return NextResponse.json(
				{ error: `Failed to create admin: ${error.message}` },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to create admin' },
			{ status: 500 }
		);
	}
}

import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Admin } from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import crypto from 'crypto';

// Extend default types for User and JWT
declare module 'next-auth' {
	interface User {
		username: string;
		name?: string | null
		isAdmin?: boolean;
	}
	interface JWT {
		username: string;
		name?: string | null
		isAdmin?: boolean;
		iat: number;
		exp: number;
		jti: string;
	}
	interface Session {
		user: {
			username: string;
			name?: string | null;
			isAdmin?: boolean;
		} & DefaultSession['user'];
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					// Connect to the database
					await connectDB();

					// Find the admin in the database
					const admin = await Admin.findOne({
						username: credentials?.username,
					});

					if (!admin) {
						console.error('Admin not found');
						return null;
					}

					// Compare passwords
					const passwordMatch = await bcrypt.compare(
						credentials?.password as string,
						admin.password.toString()
					);

					if (!passwordMatch) {
						console.error('Invalid password');
						return null;
					}

					// Return enhanced user data
					return {
						id: admin._id.toString(),
						username: admin.username,
						name: admin.name,
						isAdmin: true,
					};
				} catch (error) {
					console.error('Authorization error:', error);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/admin/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// Add custom claims to the token
				token.id = user.id;
				token.username = user.username;
				token.name = user.name;
				token.isAdmin = user.isAdmin;
				
				// Add timing claims
				token.iat = Math.floor(Date.now() / 1000);
				token.exp = Math.floor(Date.now() / 1000) + (6 * 60 * 60); // 6 hours from now
				token.jti = crypto.randomUUID(); // Unique token ID
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				// Sync session with token data
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.name = token.name as string;
				session.user.isAdmin = token.isAdmin as boolean;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 6 * 60 * 60, // 6 hours in seconds
	},
});


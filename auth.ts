import NeonAdapter from '@auth/neon-adapter';
import { Pool } from '@neondatabase/serverless';
import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	return {
		adapter: NeonAdapter(pool),
		providers: [Resend({ from: 'Hello <daniel@coarsemedia.store>' })],
		callbacks: {
			async signIn({ user }) {
				if (!user.email) return false;

				try {
					const result = await pool.query(
						'SELECT EXISTS(SELECT 1 FROM allowed_emails WHERE email = $1)',
						[user.email]
					);

					return result.rows[0].exists;
				} catch (error) {
					console.error('Database check failed:', error);
					return false;
				}
			},
			authorized: async ({ auth }) => {
				// Logged in users are authenticated, otherwise redirect to login page
				return !!auth?.user?.email;
			},
		},
		pages: {
			signIn: '/auth/signin',
			error: '/auth/error',
			verifyRequest: '/auth/verify-request',
		},
	};
});

import { auth } from '@/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const session = await auth();

	// Public paths that don't require authentication
	const publicPaths = [
		'/auth/signin',
		'/auth/error',
		'/auth/verify-request',
		'/projects',
		'/blog',
	];

	const isPublicPath = publicPaths.some(path =>
		request.nextUrl.pathname.startsWith(path)
	);

	// Redirect authenticated users away from auth pages
	if (isPublicPath && session) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	// Redirect unauthenticated users to signin page
	if (!isPublicPath && !session) {
		const searchParams = new URLSearchParams({
			callbackUrl: request.nextUrl.pathname,
		});

		return NextResponse.redirect(
			new URL(`/auth/signin?${searchParams}`, request.url)
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Protected routes
		'/dashboard/:path*',
		'/settings/:path*',
		'/auth/:path*',
	],
};

import { NextRequest, NextResponse } from 'next/server';

import { constants, utils } from '@ps-ecommerce/shared-ui-logic';

export function middleware(request: NextRequest) {
	if (request.url.includes('/_next')) {
		NextResponse.next();
	}

	const requestUserId = request.cookies.get(constants.USER_COOKIE_NAME);
	const userId = requestUserId || utils.generateId();

	request.nextUrl.searchParams.set('userId', userId);
	const response = NextResponse.rewrite(request.nextUrl);

	if (!requestUserId) {
		response.cookies.set(constants.USER_COOKIE_NAME, userId, {
			httpOnly: true,
			...(process.env.NODE_ENV === 'production'
				? {
						secure: true,
						sameSite: 'none',
				  }
				: {}),
		});
	}

	return response;
}

export const config = {
	matcher: [
		'/',
		'/api/graphql',
		'/profile/:path*',
		'/shop/:path*',
		'/wishlist/:path*',
	],
};

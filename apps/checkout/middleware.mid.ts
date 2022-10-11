import { NextRequest, NextResponse } from 'next/server';
import { constants, utils } from '@ps-ecommerce/shared-ui-logic';
// import { authMiddleware } from "@ps-ecommerce/shared-server";

// export function middleware(request: NextRequest) {
// 	console.log('CheckoutMiddleware# Running auth middleware...');
// 	return authMiddleware(request);
// }

export const config = {
	matcher: ['/shop/:path*']
};

export function middleware(request: NextRequest) {
	console.log('Middleware# Original request:', request.nextUrl.toString());
	const response = NextResponse.next();

	let userId = request.cookies.get(constants.USER_COOKIE_NAME);

	if (!userId) {
		userId = utils.generateId();
		response.cookies.set(constants.USER_COOKIE_NAME, userId, {
			httpOnly: true,
			...((process.env.NODE_ENV === 'production') ? {
				secure: true,
				sameSite: 'none'
			} : {})
		});
	}

	// console.log('Middleware# Setting userId value in an incoming request header:', userId);
	// request.headers.append(constants.USER_ID_HEADER, userId);
	// console.log('Middleware# Incoming request headers:', request.headers);

	request.nextUrl.searchParams.set('userId', userId);
	console.log('Middleware# Rewriting request to:', request.nextUrl.toString());
	return NextResponse.rewrite(request.nextUrl);
	// return response;
}

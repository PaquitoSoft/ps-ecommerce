import { NextRequest, NextResponse } from 'next/server';
import { constants, utils } from '@ps-ecommerce/shared-ui-logic';
// import { authMiddleware } from "@ps-ecommerce/shared-server";

// export function middleware(request: NextRequest) {
// 	console.log('ShellMiddleware# Running auth middleware...');
// 	return authMiddleware(request);
// }

export const config = {
	matcher: [
		// '/',
		'/api/graphql',
		'/whislist',
		// '/products-grid/:path*',
		// '/product-detail/:path*',
		'/shop/:path*',
		'/profile/:path*',
	]
};

export function middleware(request: NextRequest) {
	console.log('Shell Middleware# Original request:', request.nextUrl.toString());
	const response = NextResponse.next();

	if (request.nextUrl.pathname.includes('/_next/')) {
		return response;
	}

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

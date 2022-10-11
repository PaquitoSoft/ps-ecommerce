import { NextRequest, NextResponse } from 'next/server';
// import { CookieSerializeOptions } from 'next/dist/server/web/types';

import { constants, utils } from '@ps-ecommerce/shared-ui-logic';


export function middleware(request: NextRequest) {
	console.log('Middleware# Original request:', request.nextUrl.toString());
	const response = NextResponse.next();

	let userId = request.cookies[constants.USER_COOKIE_NAME];

	if (!userId) {
		// const cookieAttributes: CookieSerializeOptions = {
		// 	httpOnly: true
		// };
		// if (process.env.NODE_ENV === 'production') {
		// 	cookieAttributes.secure = true;
		// 	cookieAttributes.sameSite = 'none';
		// }
		userId = utils.generateId();
		response.cookie(constants.USER_COOKIE_NAME, userId, {
			httpOnly: true,
			...((process.env.NODE_ENV === 'production') ? {
				secure: true,
				sameSite: 'none'
			} : {})
		});
		// return NextResponse
		// 	.rewrite(request.nextUrl)
		// 	.cookie(constants.USER_COOKIE_NAME, userId, cookieAttributes);
	}

	// console.log('Middleware# Setting userId value in an incoming request header:', userId);
	// request.headers.append(constants.USER_ID_HEADER, userId);
	// console.log('Middleware# Incoming request headers:', request.headers);

	request.nextUrl.searchParams.set('userId', userId);
	console.log('Middleware# Rewriting request to:', request.nextUrl.toString());
	return NextResponse.rewrite(request.nextUrl);
	// return response;
}

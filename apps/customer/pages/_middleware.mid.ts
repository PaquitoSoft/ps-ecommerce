import { NextRequest, NextResponse } from 'next/server';
import { CookieSerializeOptions } from 'next/dist/server/web/types';

import { constants, utils } from '@ps-ecommerce/shared-ui-logic';


export function middleware(request: NextRequest) {
	let userId = request.cookies[constants.USER_COOKIE_NAME];
	const cookieAttributes: CookieSerializeOptions = {
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		cookieAttributes.secure = true;
		cookieAttributes.sameSite = 'none';
	}

	if (!userId) {
		userId = utils.generateId();
		return NextResponse
			.rewrite(request.nextUrl)
			.cookie(constants.USER_COOKIE_NAME, userId, cookieAttributes);
	}

	request.nextUrl.searchParams.set('userId', userId);
	return NextResponse.rewrite(request.nextUrl);
}

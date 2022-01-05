import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE_NAME } from '@plugins/constants';
import { generateId } from '@plugins/utils';
import { CookieSerializeOptions } from 'next/dist/server/web/types';


export function middleware(request: NextRequest) {
	let userId = request.cookies[USER_COOKIE_NAME];
	const cookieAttributes: CookieSerializeOptions = {
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		cookieAttributes.secure = true;
		cookieAttributes.sameSite = 'none';
	}

	if (!userId) {
		userId = generateId();
		return NextResponse.rewrite(request.nextUrl).cookie(USER_COOKIE_NAME, userId, cookieAttributes);
	}

	request.nextUrl.searchParams.set('userId', userId);
	return NextResponse.rewrite(request.nextUrl);
}

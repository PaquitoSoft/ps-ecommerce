import type { IncomingMessage } from "node:http";
import cookiesManager from 'cookie';
import { v4 as uuiv4 } from 'uuid';

export const generateId = () => uuiv4();

export const extractUserId = (
	request: IncomingMessage | Request,
	parsedUrlQuery?: Record<string, string | string[]>
) => {
  let userId: string | undefined | null;

//   console.log('Extracting userId:', { url: request.url, headers: request.headers });
  const headers = ((<IncomingMessage>request).connection !== undefined) ?
  	new Map(Object.entries((<IncomingMessage>request).headers)) : (<Request>request).headers;

  const cookieRaw = headers.get('cookie');
  if (cookieRaw) {
	const cookies = cookiesManager.parse(Array.isArray(cookieRaw) ? cookieRaw[0] || '' : cookieRaw || '');
	userId = cookies.uid;
  }

  if (!userId) {
    // const authHeader = request.headers['authorization'];
	const authHeader = headers.get('authorization');
	userId = (Array.isArray(authHeader) ? authHeader[0] : authHeader)?.split(' ')[1];
  }

  if (!userId && parsedUrlQuery) {
	userId = Array.isArray(parsedUrlQuery.userId) ? parsedUrlQuery.userId[0] : parsedUrlQuery.userId;
  }

  return userId;
};

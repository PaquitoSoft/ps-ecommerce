import type { IncomingMessage } from "node:http";
import cookiesManager from 'cookie';
import { v4 as uuiv4 } from 'uuid';

export const generateId = () => uuiv4();

export const extractUserId = (
	request: IncomingMessage,
	parsedUrlQuery?: Record<string, string | string[]>
) => {
  let userId: string | undefined | null;

//   console.log('Extracting userId:', { url: request.url, headers: request.headers });

  if (!userId) {
	const cookies = cookiesManager.parse(request.headers.cookie || '');
	userId = cookies.uid;
  }

  if (!userId) {
    const authHeader = request.headers['authorization'];
	userId = authHeader?.split(' ')[1];
  }

  if (!userId && parsedUrlQuery) {
	userId = Array.isArray(parsedUrlQuery.userId) ? parsedUrlQuery.userId[0] : parsedUrlQuery.userId;
  }

//   if (!userId) {
// 	throw new Error('User ID could no be found in the incoming request');
//   }

  return userId;
};

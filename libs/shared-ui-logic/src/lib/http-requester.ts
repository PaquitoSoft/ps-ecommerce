import * as localStorage from './local-storage';

import { Dictionary } from '@ps-ecommerce/types';

type GetDataRequest = {
	url: string;
	ttl?: number; // minutes
	headers?: Dictionary<string>;
};

type ResponseParser = (response: Response) => unknown;

export interface HttpError extends Error {
	statusCode?: number;
	response?: Response;
}

const parsersMap: Dictionary<ResponseParser> = {
	'base': (response: Response) => response.text(),
	'text/plain': () => false,
	'text/html': () => false,
	'text/xml': () => false,
	'application/json': async (response: Response) => {
		// This is to handle empty responses as response.json()
		// fails in that scenario (try to parse an empty string
		// raises a parsing error)
		const text = await response.text();
		return text && JSON.parse(text);
	},
};

function parseResponse(response: Response) {
	const contentType = (response.headers.get('content-type') || 'base').split(';')[0];
	const parser: ResponseParser = parsersMap[contentType] || parsersMap.base;

	return parser(response);
}

export async function getData({ url, headers = {}, ttl }: GetDataRequest): Promise<unknown> {
	const result: unknown = localStorage.read(url);

	if (result) {
		return Promise.resolve(result);
	}

	const response: Response = await fetch(url, { headers: headers || {} });

	if (response.status >= 400) {
		const error: HttpError = new Error(response.statusText);
		error.statusCode = response.status;
		error.response = response;
		throw error;
	}

	const data = await parseResponse(response);

	if (ttl) {
		localStorage.store(url, data, { ttl });
	}

	return data;
}

type SendDataParams = {
	url: string;
	method?: string;
	body?: unknown;
	headers?: Dictionary<string>;
}

export async function sendData<T>({ url, body, method = 'POST', headers = {} }: SendDataParams): Promise<T> {
	const requestOptions: Dictionary<unknown> = {
		method,
		headers: {
			...headers,
			'Content-Type': 'application/json'
		}
	};

	if (body) {
		requestOptions.body = JSON.stringify(body);
	}

	const response: Response = await fetch(url, requestOptions);

	if (response.status >= 400) {
		const error: HttpError = new Error(response.statusText);
		error.statusCode = response.status;
		error.response = response;
		throw error;
	}

	const data = await parseResponse(response);

	return data as T;
}

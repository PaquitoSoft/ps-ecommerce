import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from '@apollo/client';

import ApolloContext from './apollo-context.type';

const buildAuthLink = (appContext?: ApolloContext) => new ApolloLink((operation, forward) => {
	operation.setContext((context: { headers?: Record<string, string>; }) => ({
		headers: {
			...context?.headers || {},
			'authorization': `Bearer ${appContext?.userId}`
		}
	}));
	return forward(operation);
});

export function createApolloClient(
	{
		endpointUrl,
		context = {}
	}: {
		endpointUrl?: string;
		context?: ApolloContext;
	}
) {
	return new ApolloClient({
		ssrMode: true,
		link: from([
			buildAuthLink(context),
			new HttpLink({
				uri: endpointUrl,
				// credentials: 'same-origin'
			})
		]),
		cache: new InMemoryCache()
	});
}

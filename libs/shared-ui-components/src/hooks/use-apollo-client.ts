import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

let apolloClient: ApolloClient<unknown> | null = null;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: false,
		link: new HttpLink({
			uri: '/api/graphql',
			credentials: 'same-origin'
		}),
		cache: new InMemoryCache()
	});
}

function initializeApollo(initialState: unknown = null) {
	const client = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		client.cache.restore(initialState);
	}

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = client;

	return client;
}

export default function useApollo(initialState: unknown | null) {
	const store = useMemo(() => initializeApollo(initialState), [initialState])
	return store;
}

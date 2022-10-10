import { ApolloClient, InMemoryCache } from '@apollo/client';

import { SchemaLink } from '@apollo/client/link/schema';
import { schema } from './schema';

let apolloClient: ApolloClient<any> | null = null;

export function createApolloClient(context: ApolloContext = {}) {
	return new ApolloClient({
		ssrMode: true,
		link: new SchemaLink({ schema, context }),
		cache: new InMemoryCache()
	});
}

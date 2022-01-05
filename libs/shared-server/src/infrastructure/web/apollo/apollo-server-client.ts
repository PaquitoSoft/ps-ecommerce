import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';

import ApolloContext from './apollo-context.type';
import { schema } from './schema';

export function createApolloClient(context: ApolloContext = {}) {
	return new ApolloClient({
		ssrMode: true,
		link: new SchemaLink({ schema, context }),
		cache: new InMemoryCache()
	});
}

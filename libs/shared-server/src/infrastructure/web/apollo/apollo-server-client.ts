import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';

import ApolloContext from './apollo-context.type';
import { createSchema, SchemaExtensions } from './schema';

export function createApolloClient(
	{
		context = {},
		schemaExtensions
	}: {
		context?: ApolloContext;
		schemaExtensions?: SchemaExtensions[];
	}
) {
	return new ApolloClient({
		ssrMode: true,
		link: new SchemaLink({
			schema: createSchema(schemaExtensions || []),
			context
		}),
		cache: new InMemoryCache()
	});
}

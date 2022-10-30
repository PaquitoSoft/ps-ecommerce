import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer/*, gql*/ } from'apollo-server';
import merge from 'lodash.merge';

import { sharedGraphqlTypes } from '@ps-ecommerce/shared-server';

import * as ProductType from './apollo/types/product-gql-type';
import * as CategoryType from './apollo/types/category-gql-type';

import MongoProductRepository from '../repositories/mongo-product-repo';
import MongoCategoryRepository from '../repositories/mongo-category-repo';

type TStartServerParams = {
	port: number;
};

export async function startServer({
	port
}: TStartServerParams) {
	const server = new ApolloServer({
		cors: true,
		introspection: true,
		schema: buildSubgraphSchema({
			typeDefs: [
				ProductType.typeDef,
				CategoryType.typeDef,
				sharedGraphqlTypes.bigintType.typeDef
			],
			resolvers: merge(
				{},
				ProductType.resolvers,
				CategoryType.resolvers,
				sharedGraphqlTypes.bigintType.resolvers
			)
		}),
		context: async ({ req }) => {
			console.log({ request: req });
			return {
				userId: req.query.userId || req.get('authorization'),
			}
		},
		// Our GraphQL repositories are using GraphQLDataSource package which implements
		// Apollo DataSources but it does not explicitly use it in its base class so
		// the types does not match although the code is fine
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dataSources: () => {
			return {
				product: new MongoProductRepository(),
				category: new MongoCategoryRepository()
			};
		},
	});

	try {
		const { url } = await server.listen({ port });
		console.log(`🚀 Subgraph 'catalog' running at ${url}`);
		return server;
	} catch (error) {
		console.error(error);
	}
};

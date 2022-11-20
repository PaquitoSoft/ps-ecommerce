import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer/*, gql*/ } from'apollo-server';
import merge from 'lodash.merge';

import { sharedGraphqlTypes, webServer } from '@ps-ecommerce/shared-server';

import * as ProductType from './apollo/types/product-gql-type';
import * as CategoryType from './apollo/types/category-gql-type';
import * as FooterLinkType from './apollo/types/footer-link-gql-type';

import MongoProductRepository from '../repositories/mongo-product-repo';
import MongoCategoryRepository from '../repositories/mongo-category-repo';
import MongoFooterLinkRepository from '../repositories/mongo-footer-link-repo';

type TStartServerParams = {
	port: number;
};

export function startServer({
	port
}: TStartServerParams) {
	return webServer.startServer({
		serviceName: 'customer',
		port,
		typesConfiguration: [
			ProductType,
			CategoryType,
			FooterLinkType
		],
		dataSources: () => {
			return {
				product: new MongoProductRepository(),
				category: new MongoCategoryRepository(),
				footerLink: new MongoFooterLinkRepository()
			};
		},
	});
};

// export async function startServer({
// 	port
// }: TStartServerParams) {
// 	const server = new ApolloServer({
// 		cors: true,
// 		introspection: true,
// 		schema: buildSubgraphSchema({
// 			typeDefs: [
// 				ProductType.typeDef,
// 				CategoryType.typeDef,
// 				FooterLinkType.typeDef,
// 				sharedGraphqlTypes.bigintType.typeDef
// 			],
// 			resolvers: merge(
// 				{},
// 				ProductType.resolvers,
// 				CategoryType.resolvers,
// 				FooterLinkType.resolvers,
// 				sharedGraphqlTypes.bigintType.resolvers
// 			)
// 		}),
// 		context: async ({ req }) => {
// 			const auth = req.get('authorization');
// 			return {
// 				// userId: req.query.userId || req.get('authorization'),
// 				userId: auth?.split(' ')[1],
// 			}
// 		},
// 		// Our GraphQL repositories are using GraphQLDataSource package which implements
// 		// Apollo DataSources but it does not explicitly use it in its base class so
// 		// the types does not match although the code is fine
// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 		// @ts-ignore
// 		dataSources: () => {
// 			return {
// 				product: new MongoProductRepository(),
// 				category: new MongoCategoryRepository(),
// 				footerLink: new MongoFooterLinkRepository()
// 			};
// 		},
// 	});

// 	try {
// 		const { url } = await server.listen({ port });
// 		console.log(`🚀 Subgraph 'catalog' running at ${url}`);
// 		return server;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

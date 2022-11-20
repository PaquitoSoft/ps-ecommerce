import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer/*, gql*/ } from'apollo-server';
import merge from 'lodash.merge';

import { sharedGraphqlTypes, webServer } from '@ps-ecommerce/shared-server';

import * as ShopCartType from './apollo/types/shop-cart-gql-type';
import * as ShippingAddressType from './apollo/types/shipping-address-gql-type';
// import { typeDef as ProductTypeDefinitions } from './apollo/types/product-gql-type';
import * as OrderType from './apollo/types/order-gql-type';

import MongoShopCartRepository from '../repositories/mongo-shop-cart-repo';
import GraphqlProductRepository from '../repositories/graphql-product-repo';
import GraphqlOrderRepository from '../repositories/graphql-order-repository';

type TStartServerParams = {
	port: number;
	externalServicesConfig: {
		catalogServiceUrl: string;
		customerServiceUrl: string;
	}
};

export function startServer({
	port,
	externalServicesConfig
}: TStartServerParams) {
	return webServer.startServer({
		serviceName: 'checkout',
		port,
		typesConfiguration: [
			ShopCartType,
			ShippingAddressType,
			OrderType,
		],
		dataSources: () => {
			return {
				shopCart: new MongoShopCartRepository(),
				product: new GraphqlProductRepository(externalServicesConfig.catalogServiceUrl),
				order: new GraphqlOrderRepository(externalServicesConfig.customerServiceUrl)
			};
		},
	});
};

// export async function __startServer({
// 	port,
// 	externalServicesConfig
// }: TStartServerParams) {
// 	const server = new ApolloServer({
// 		cors: true,
// 		introspection: true,
// 		schema: buildSubgraphSchema({
// 			typeDefs: [
// 				ShopCartType.typeDef,
// 				ShippingAddressTypeDefinitions,
// 				// ProductTypeDefinitions,
// 				OrderTypeDefinitions,
// 				sharedGraphqlTypes.bigintType.typeDef
// 			],
// 			resolvers: merge(
// 				{},
// 				ShopCartType.resolvers,
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
// 				shopCart: new MongoShopCartRepository(),
// 				product: new GraphqlProductRepository(externalServicesConfig.catalogServiceUrl),
// 				order: new GraphqlOrderRepository(externalServicesConfig.customerServiceUrl)
// 			};
// 		},
// 	});

// 	try {
// 		const { url } = await server.listen({ port });
// 		console.log(`🚀 Subgraph 'checkout' running at ${url}`);
// 		return server;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

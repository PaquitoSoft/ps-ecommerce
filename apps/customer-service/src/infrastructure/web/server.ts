import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer/*, gql*/ } from'apollo-server';
import merge from 'lodash.merge';

import { sharedGraphqlTypes, webServer } from '@ps-ecommerce/shared-server';

import * as OrderType from './apollo/types/order-gql-type';
import * as WishlistType from './apollo/types/wishlist-gql-type';
import * as PaymentDataType from './apollo/types/payment-data-gql-type';
import * as ShippingAddressType from './apollo/types/shipping-address-gql-type';

import MongoOrderRepository from '../repositories/mongo-order-repo';
import MongoWishlistRepository from '../repositories/mongo-wishlist-repo';

type TStartServerParams = {
	port: number;
};

export function startServer({
	port
}: TStartServerParams) {
	return webServer.startServer({
		serviceName: 'checkout',
		port,
		typesConfiguration: [
			OrderType,
			WishlistType,
			PaymentDataType,
			ShippingAddressType,
		],
		dataSources: () => {
			return {
				order: new MongoOrderRepository(),
				wishlist: new MongoWishlistRepository()
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
// 				OrderType.typeDef,
// 				WishlistType.typeDef,
// 				PaymentDataType.typeDef,
// 				ShippingAddressType.typeDef,
// 				sharedGraphqlTypes.bigintType.typeDef
// 			],
// 			resolvers: merge(
// 				{},
// 				OrderType.resolvers,
// 				WishlistType.resolvers,
// 				sharedGraphqlTypes.bigintType.resolvers
// 			)
// 		}),
// 		context: async ({ req }) => {
// 			const auth = req.get('authorization');
// 			return {
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
// 				order: new MongoOrderRepository(),
// 				wishlist: new MongoWishlistRepository()
// 			};
// 		},
// 	});

// 	try {
// 		const { url } = await server.listen({ port });
// 		console.log(`🚀 Subgraph 'customer' running at ${url}`);
// 		return server;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

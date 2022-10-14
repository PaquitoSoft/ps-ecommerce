import merge from 'lodash.merge';
import { RepositoryFactory } from '@ps-ecommerce/shared-server';

import * as OrderType from './lib/infrastructure/web/apollo/types/order-gql-type';
import * as WishlistType from './lib/infrastructure/web/apollo/types/wishlist-gql-type';
import * as PaymentDataType from './lib/infrastructure/web/apollo/types/payment-data-gql-type';

import MongoOrderRepository from './lib/infrastructure/repositories/order/mongo-order-repo';
import MongoWishlistRepository from './lib/infrastructure/repositories/wishlist/mongo-wishlist-repo';

export type { default as OrderRepository } from './lib/domain/order/order-repo';

export const graphqlSchemaExtensions = {
	typeDefs: [OrderType.typeDef, PaymentDataType.typeDef, WishlistType.typeDef],
	resolvers: merge(OrderType.resolvers, WishlistType.resolvers)
};

export const repositoryTypes = Object.freeze({
	Order: 'shop-cart-repo',
	Wishlist: 'wishlist-repo'
});

export const repositoryFactory = new RepositoryFactory({
	[repositoryTypes.Order]: MongoOrderRepository,
	[repositoryTypes.Wishlist]: MongoWishlistRepository
});

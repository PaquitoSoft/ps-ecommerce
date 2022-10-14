import { RepositoryFactory } from '@ps-ecommerce/shared-server';

import * as ShopCartType from './lib/infrastructure/web/apollo/types/shop-cart-gql-type';
import * as ShippingAddressType from './lib/infrastructure/web/apollo/types/shipping-address-gql-type';

import MongoShopCartRepository from './lib/infrastructure/repositories/shopcart/mongo-shop-cart-repo';

export const graphqlSchemaExtensions = {
	typeDefs: [ShopCartType.typeDef, ShippingAddressType.typeDef],
	resolvers: ShopCartType.resolvers
};

export const repositoryTypes = Object.freeze({
	ShopCart: 'shop-cart-repo'
});

export const repositoryFactory = new RepositoryFactory({
	[repositoryTypes.ShopCart]: MongoShopCartRepository
});

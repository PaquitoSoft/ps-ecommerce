import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from '@apollo/client';
import merge from 'lodash.merge';

import {
	typeDef as BigIntTypeDef,
	resolvers as BigIntResolver
} from './types/bigint-gql-type';
import {
	typeDef as CategoryTypeDef,
	resolvers as CategoryResolvers
} from './types/category-gql-type';
import {
	typeDef as ProductTypeDef,
	resolvers as ProductResolvers
} from './types/product-gql-type';
import {
	typeDef as FooterLinkTypeDef,
	resolvers as FooterLinkResolvers
} from './types/footer-link-gql-type';
import {
	typeDef as ShippingAddressTypeDef
} from './types/shipping-address-gql-type';
import {
	typeDef as PaymentDataTypeDef
} from './types/payment-data-gql-type';
import {
		typeDef as ShopCartTypeDef,
		resolvers as ShopCartResolvers
} from './types/shop-cart-gql-type';
import {
	typeDef as WishlistTypeDef,
	resolvers as WishlistResolvers
} from './types/wishlist-gql-type';
import {
	typeDef as OrderTypeDef,
	resolvers as OrderResolvers
} from './types/order-gql-type';

const Query = gql`
	type Query {
		_empty: String
	}
`;

const Mutation = gql`
	type Mutation {
		_empty: String
	}
`;

export const schema = makeExecutableSchema({
	typeDefs: [
		Query,
		Mutation,
		BigIntTypeDef,
		CategoryTypeDef,
		ProductTypeDef,
		FooterLinkTypeDef,
		WishlistTypeDef,
		ShippingAddressTypeDef,
		PaymentDataTypeDef,
		ShopCartTypeDef,
		OrderTypeDef
	],
	resolvers: merge(
		{},
		BigIntResolver,
		CategoryResolvers,
		ProductResolvers,
		FooterLinkResolvers,
		WishlistResolvers,
		ShopCartResolvers,
		OrderResolvers
	)
});

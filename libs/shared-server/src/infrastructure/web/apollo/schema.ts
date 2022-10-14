import { makeExecutableSchema } from '@graphql-tools/schema';
import { DocumentNode, gql } from '@apollo/client';
import merge from 'lodash.merge';

import {
	typeDef as BigIntTypeDef,
	resolvers as BigIntResolver
} from './types/bigint-gql-type';
// import {
// 	typeDef as CategoryTypeDef,
// 	resolvers as CategoryResolvers
// } from '../../../../../catalog-backend/src/lib/infrastructure/web/apollo/types/category-gql-type';
// import {
// 	typeDef as ProductTypeDef,
// 	resolvers as ProductResolvers
// } from '../../../../../catalog-backend/src/lib/infrastructure/web/apollo/types/product-gql-type';
import {
	typeDef as FooterLinkTypeDef,
	resolvers as FooterLinkResolvers
} from './types/footer-link-gql-type';
// import {
// 	typeDef as ShippingAddressTypeDef
// } from '../../../../../checkout-backend/src/lib/infrastructure/web/apollo/types/shipping-address-gql-type';
// import {
// 	typeDef as PaymentDataTypeDef
// } from '../../../../../checkout-backend/src/lib/infrastructure/web/apollo/types/payment-data-gql-type';
// import {
// 		typeDef as ShopCartTypeDef,
// 		resolvers as ShopCartResolvers
// } from '../../../../../checkout-backend/src/lib/infrastructure/web/apollo/shop-cart-gql-type';
// import {
// 	typeDef as WishlistTypeDef,
// 	resolvers as WishlistResolvers
// } from '../../../../../customer-backend/src/lib/infrastructure/web/apollo/types/wishlist-gql-type';
// import {
// 	typeDef as OrderTypeDef,
// 	resolvers as OrderResolvers
// } from '../../../../../customer-backend/src/lib/infrastructure/web/apollo/types/order-gql-type';

// import { graphqlTypes as checkoutTypes } from '@ps-ecommerce/checkout-backend';

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

export type SchemaExtensions = {
	typeDefs?: DocumentNode[];
	resolvers?: Record<string, unknown>;
};

export function createSchema(schemaExtensions: SchemaExtensions[]) {
	return makeExecutableSchema({
		typeDefs: [
			Query,
			Mutation,
			BigIntTypeDef,
			// CategoryTypeDef,
			// ProductTypeDef,
			FooterLinkTypeDef,
			// WishlistTypeDef,
			// ShippingAddressTypeDef,
			// PaymentDataTypeDef,
			// ShopCartTypeDef,
			// checkoutTypes.ShopCartType.typeDef,
			// OrderTypeDef,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			...(schemaExtensions.filter(se => !!se.typeDefs).map(se => se.typeDefs!))
		],
		resolvers: merge(
			{},
			BigIntResolver,
			// CategoryResolvers,
			// ProductResolvers,
			FooterLinkResolvers,
			// WishlistResolvers,
			// ShopCartResolvers,
			// checkoutTypes.ShopCartType.resolvers,
			// OrderResolvers,
			// (resolvers || {})
			schemaExtensions.reduce((agg, se) => {
				if (se.resolvers) agg = merge(agg, se.resolvers);
				return agg;
			}, {})
		)
	})
}

// export const schema = makeExecutableSchema({
// 	typeDefs: [
// 		Query,
// 		Mutation,
// 		BigIntTypeDef,
// 		CategoryTypeDef,
// 		ProductTypeDef,
// 		FooterLinkTypeDef,
// 		WishlistTypeDef,
// 		ShippingAddressTypeDef,
// 		PaymentDataTypeDef,
// 		// ShopCartTypeDef,
// 		checkoutTypes.ShopCartType.typeDef,
// 		OrderTypeDef
// 	],
// 	resolvers: merge(
// 		{},
// 		BigIntResolver,
// 		CategoryResolvers,
// 		ProductResolvers,
// 		FooterLinkResolvers,
// 		WishlistResolvers,
// 		// ShopCartResolvers,
// 		checkoutTypes.ShopCartType.resolvers,
// 		OrderResolvers
// 	)
// });

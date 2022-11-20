import { gql } from '@apollo/client';
// import { GraphQLResolveInfo } from 'graphql';

import ApolloContext from '../apollo-context';

import addProductToWishlistAction from '../../../../application/use-cases/wishlist/add-product-to-wishlist-action';
import getUserWishlistAction from '../../../../application/use-cases/wishlist/get-user-wishlist-action';
import removeProductFromWishlistAction from '../../../../application/use-cases/wishlist/remove-product-from-wishlist-action';

export const typeDef = gql`
	extend schema
		@link(url: "https://specs.apollo.dev/federation/v2.0",
			import: ["@key", "@inaccessible"])

	type Wishlist @key(fields: "id") {
		id: ID!
		userId: String!
		name: String!
		# We need this field to be accesible by other subgraphs (Catalog to resolve the products)
		# but we don't want it to be in the public supegraph API
		productsIds: [String] @inaccessible
	}

	extend type Query {
		wishlist: Wishlist
	}

	extend type Mutation {
		addToWishlist(productId: ID!): Wishlist
		removeFromWishlist(productId: ID!): Wishlist
	}
`;

const getUserWishlist = async (
	_root: unknown,
	_args: unknown,
	context: ApolloContext,
	// info: GraphQLResolveInfo
) => {
	const userId = context.userId;

	const wishlist = await getUserWishlistAction(userId, {
		wishlistRepository: context.dataSources.wishlist
	});

	return wishlist;
};

const addToWishlist = async (
	_root: unknown,
	args: { productId: string },
	context: ApolloContext,
) => {
	const userId = context.userId;
	const productId = args.productId;

	const wishlist = await addProductToWishlistAction(userId, productId, {
		wishlistRepository: context.dataSources.wishlist
	});

	return wishlist;
};

const removeFromWishlist = async (
	_root: unknown,
	args: { productId: string },
	context: ApolloContext,
) => {
	const userId = context.userId;
	const productId = args.productId;

	const wishlist = await removeProductFromWishlistAction(userId, productId, {
		wishlistRepository: context.dataSources.wishlist
	});

	return wishlist;
};

export const resolvers = {
	Wishlist: {
		id: (root: { _id: unknown; id: unknown; }) => root._id || root.id
	},
	Query: {
		wishlist: getUserWishlist
	},
	Mutation: {
		addToWishlist,
		removeFromWishlist
	}
};

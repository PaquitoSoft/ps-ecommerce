import { gql } from '@apollo/client';
import { GraphQLResolveInfo } from 'graphql';

import { buildRepository, RepositoryType } from '../../../repositories/repository-factory';
import addProductToWishlistAction from '../../../../application/use-cases/wishlist/add-product-to-wishlist-action';
import getUserWishlistAction from '../../../../application/use-cases/wishlist/get-user-wishlist-action';
import removeProductFromWishlistAction from '../../../../application/use-cases/wishlist/remove-product-from-wishlist-action';

import WishlistRepository from '../../../../domain/wishlist/wishlist-repo';

export const typeDef = gql`
	type Wishlist {
		id: ID!
		userId: String!
		name: String!
		products: [Product]!
	}

	extend type Query {
		wishlist: Wishlist
	}

	extend type Mutation {
		addToWishlist(productId: ID!): Wishlist
		removeFromWishlist(productId: ID!): Wishlist
	}
`;

const getUserWishlists = async (root: any, args: any, context: any, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;

	const wishlistRepository = await buildRepository<WishlistRepository>(RepositoryType.Wishlist);
	const wishlist = await getUserWishlistAction(userId, { wishlistRepository });

	return wishlist;
};

const addToWishlist = async (root: any, args: any, context: any, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;
	const productId = args.productId as string;

	const wishlistRepository = await buildRepository<WishlistRepository>(RepositoryType.Wishlist);
	const wishlist = await addProductToWishlistAction(userId, productId, { wishlistRepository });

	return wishlist;
};

const removeFromWishlist = async (root: any, args: any, context: any, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;
	const productId = args.productId as string;

	const wishlistRepository = await buildRepository<WishlistRepository>(RepositoryType.Wishlist);
	const wishlist = await removeProductFromWishlistAction(userId, productId, { wishlistRepository });

	return wishlist;
};

export const resolvers = {
	Wishlist: {
		id: (root: { _id: any; id: any; }) => root._id || root.id
	},
	Query: {
		wishlist: getUserWishlists
	},
	Mutation: {
		addToWishlist,
		removeFromWishlist
	}
};

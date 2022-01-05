import { gql, useQuery, useMutation } from '@apollo/client';
import Wishlist from '@app-types/wishlist';
import { useCallback } from 'react';

const WishlistFragment = gql`
	fragment WishlistFields on Wishlist {
		id
		userId
		name
		products {
			price
			gridImages
			altName
			name
			code
			id
		}
	}
`;

export const WishlistQuery = gql`
	${WishlistFragment}
	query WishlistQuery {
		wishlist {
			...WishlistFields
		}
	}
`;

const AddToWishlistMutation = gql`
	${WishlistFragment}
	mutation AddToWishlist($productId: ID!) {
		addToWishlist(productId: $productId) {
			...WishlistFields
		}
	}
`;

const RemoveFromWishlistMutation = gql`
	${WishlistFragment}
	mutation RemoveFromWishlist($productId: ID!) {
		removeFromWishlist(productId: $productId) {
			...WishlistFields
		}
	}
`;

const useWishlist = () => {
	const {
		// error,
		// loading,
		data,
	} = useQuery<{ wishlist: Wishlist }>(WishlistQuery);

	const [addToCartMutation] = useMutation(AddToWishlistMutation, {
		refetchQueries: () => !data?.wishlist ? [{ query: WishlistQuery }] : []
	});
	const [removeFromCartMutation] = useMutation(RemoveFromWishlistMutation);

	const isProductInWishlist = useCallback((productId: string) => {
		return data?.wishlist?.products.some(wishlistProduct => wishlistProduct.id === productId) || false;
	}, [data]);

	const handleProductSelection = useCallback(async (productId: string) => {
		if (isProductInWishlist(productId)) {
			removeFromCartMutation({ variables: { productId } });
		} else {
			addToCartMutation({ variables: { productId } });
		}
	}, [isProductInWishlist, addToCartMutation, removeFromCartMutation]);

	return {
		state: {
			wishlist: data?.wishlist,
		},
		actions: {
			isProductInWishlist,
			handleProductSelection
		}
	};
};

export default useWishlist;

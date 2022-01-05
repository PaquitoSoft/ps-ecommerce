import { useCallback } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import {
	PaymentData,
	Product,
	Size,
	ShippingAddress,
	ShopCart
} from '@ps-ecommerce/types';

export const ShopCartFragment = gql`
	fragment ShopCartFields on ShopCart {
		id
		totalAmount
		totalUnits
		userId
		items {
			id
			quantity
			product {
				id
				code
				name
				sizeCode
				sizeName
				price
				colorName
				imageUrl
			}
		}
		estimatedDeliveryCost
		shippingAddress {
			email
			name
			surname
			addressLine
			postalCode
			city
		}
	}
`;

export const ShopCartQuery = gql`
	${ShopCartFragment}
	query ShopCartQuery {
		shopCart {
			...ShopCartFields
		}
	}
`;

const AddToCartMutation = gql`
	${ShopCartFragment}
	mutation AddToCart($productCode: String!, $sizeCode: String!) {
		addToShopCart(productCode: $productCode, sizeCode: $sizeCode) {
			...ShopCartFields
		}
	}
`;

const RemoveFromCartMutation = gql`
	${ShopCartFragment}
	mutation RemoveFromCart($orderItemId: ID!) {
		removeFromShopCart(orderItemId: $orderItemId) {
			...ShopCartFields
		}
	}
`;

const UpdateItemInCartMutation = gql`
	${ShopCartFragment}
	mutation UpdateItemInCart($orderItemId: ID!, $quantity: Int!) {
		updateInShopCart(orderItemId: $orderItemId, quantity: $quantity) {
			...ShopCartFields
		}
	}
`;

const SaveShippingAddressMutation = gql`
	${ShopCartFragment}
	mutation SaveShippingAddressMutation($shippingAddress: NewShippingAddress!) {
		saveShippingAddress(shippingAddress: $shippingAddress) {
			...ShopCartFields
		}
	}
`;

const CheckoutMutation = gql`
	mutation CheckoutMutation($paymentData: NewPaymentData!) {
		checkout(paymentData: $paymentData) {
			id
			code
		}
	}
`;

const defaultShopCart: ShopCart = {
	id: '',
	userId: '',
	items: [],
	totalUnits: 0,
	estimatedDeliveryCost: 0,
	totalAmount: 0
}

const useShopCart = () => {
	const {
		// error,
		// loading,
		data,
	} = useQuery(ShopCartQuery);

	const [addToCartMutation] = useMutation(AddToCartMutation, {
		refetchQueries: () => data?.shopCart.totalUnits === 0 ? [{ query: ShopCartQuery }] : []
	});
	const [removeFromCartMutation] = useMutation(RemoveFromCartMutation);
	const [updateItemInCartMutation] = useMutation(UpdateItemInCartMutation);
	const [saveShippingAddressMutation] = useMutation(SaveShippingAddressMutation);
	const [checkoutMutation] = useMutation(CheckoutMutation, {
		refetchQueries: [{ query: ShopCartQuery }]
	});

	const addToCart = useCallback(async (product: Product, size: Size) => {
		return addToCartMutation({ variables: { productCode: product.code, sizeCode: size.code } });
	}, [addToCartMutation]);

	const updateItemInCart = useCallback(async (orderItemId: string, quantity: number) => {
		return updateItemInCartMutation({ variables: { orderItemId, quantity } });
	}, [updateItemInCartMutation]);

	const removeFromCart = useCallback(async (orderItemId: string) => {
		return removeFromCartMutation({ variables: { orderItemId } });
	}, [removeFromCartMutation]);

	const saveShippingAddress = useCallback(async (shippingAddress: ShippingAddress) => {
		return saveShippingAddressMutation({ variables: { shippingAddress } });
	}, [saveShippingAddressMutation]);

	const checkout = useCallback(async (paymentData: PaymentData) => {
		return checkoutMutation({ variables: { paymentData } });
	}, [checkoutMutation]);

	return {
		state: {
			shopCart: (data?.shopCart || defaultShopCart) as ShopCart
		},
		actions: {
			addToCart,
			updateItemInCart,
			removeFromCart,
			saveShippingAddress,
			checkout
		}
	};
};

export default useShopCart;

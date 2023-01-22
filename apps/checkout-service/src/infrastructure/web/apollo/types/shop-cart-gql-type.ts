import { gql } from '@apollo/client';
import type { ShopCart, PaymentData, ShippingAddress } from '@ps-ecommerce/types';

import ApolloContext from '../apollo-context';

import getUserShopCartAction from '../../../../application/use-cases/shop-cart/get-user-shop-cart-action';
import addToShopCartAction from '../../../../application/use-cases/shop-cart/add-product-to-cart-action';
import removeProductFromCartAction from '../../../../application/use-cases/shop-cart/remove-product-from-cart-action';
import updateProductInCartAction from '../../../../application/use-cases/shop-cart/update-product-in-cart-action';
import saveShippingAddressInCartAction from '../../../../application/use-cases/shop-cart/save-shipping-address-in-cart-action';
import checkoutAction from '../../../../application/use-cases/shop-cart/checkout-action';
import getIsProductPopularAction from '../../../../application/use-cases/shop-cart/get-is-product-popular-action';

export const typeDef = gql`
	extend schema
		@link(url: "https://specs.apollo.dev/federation/v2.0",
			import: ["@key", "@external", "@requires"])

	type Product @key(fields: "code") {
		code: String!
		isPopular: Boolean!
	}

	type ShopCartProduct {
		id: ID!
		code: String!
		name: String!
		sizeCode: String!
		sizeName: String!
		price: Float!
		colorName: String!
		imageUrl: String!
	}

	type ShopCartItem {
		id: ID!
		product: ShopCartProduct!
		quantity: Int!
	}

	type ShopCart {
		id: ID!
		userId: String!
		items: [ShopCartItem]
		totalUnits: Int!
		estimatedDeliveryCost: Int!
		totalAmount: Int!
		shippingAddress: ShippingAddress
	}

	input NewShippingAddress {
		email: String!
		name: String!
		surname: String!
		addressLine: String!
		postalCode: String!
		city: String!
	}

	input NewCreditCard {
		pan: String!
		cardholder: String!
		expirationDate: String!
		cvv: String!
	}

	input NewPaymentData {
		paymentMethod: String!
		paymentDetails: NewCreditCard!
	}

	extend type Query {
		shopCart: ShopCart
	}

	extend type Mutation {
		addToShopCart(productCode: String!, sizeCode: String!): ShopCart
		removeFromShopCart(orderItemId: ID!): ShopCart
		updateInShopCart(orderItemId: ID!, quantity: Int!): ShopCart
		saveShippingAddress(shippingAddress: NewShippingAddress): ShopCart
		checkout(paymentData: NewPaymentData): ClosedCart
	}
`;

const getUserShopCart = async (
	_parent: ShopCart,
	_args: unknown,
	context: ApolloContext,
	// info: GraphQLResolveInfo
) => {
	const userId = context.userId as string;

	const shopCart = await getUserShopCartAction(userId, {
		shopCartRepository: context.dataSources.shopCart
	});
	return shopCart;
};

const addToShopCart = async (
	_parent: ShopCart,
	args: {
		productCode: string;
		sizeCode: string;
	},
	context: ApolloContext
) => {
	const userId = context.userId as string;
	const productCode = args.productCode;
	const sizeCode = args.sizeCode;

	const shopCart = await addToShopCartAction(userId, productCode, sizeCode, {
		shopCartRepository: context.dataSources.shopCart,
		productRepository: context.dataSources.product
	});

	return shopCart;
};

const removeFromShopCart = async (
	_parent: ShopCart,
	args: {
		orderItemId: string;
	},
	context: ApolloContext
) => {
	const userId = context.userId as string;
	const orderItemId = args.orderItemId;

	const shopCart = await removeProductFromCartAction(userId, orderItemId, {
		shopCartRepository: context.dataSources.shopCart
	});

	return shopCart;
};

const updateInShopCart = async (
	_parent: ShopCart,
	args: {
		orderItemId: string;
		quantity: number;
	},
	context: ApolloContext
) => {
	const userId = context.userId as string;
	const orderItemId = args.orderItemId;
	const quantity = args.quantity;

	const shopCart = await updateProductInCartAction(userId, orderItemId, quantity, {
		shopCartRepository: context.dataSources.shopCart
	});

	return shopCart;
};

const saveShippingAddress = async (
	_parent: ShopCart,
	args: {
		shippingAddress: ShippingAddress
	},
	context: ApolloContext
) => {
	const userId = context.userId as string;
	const shippingAddress = args.shippingAddress;

	const shopCart = await saveShippingAddressInCartAction(userId, shippingAddress, {
		shopCartRepository: context.dataSources.shopCart
	});

	return shopCart;
};

const checkout = async (
	_parent: ShopCart,
	args: {
		paymentData: PaymentData;
	},
	context: ApolloContext
) => {
	const userId = context.userId as string;
	const paymentData = args.paymentData;

	const newOrder = await checkoutAction(userId, paymentData, {
		shopCartRepository: context.dataSources.shopCart,
		orderRepository: context.dataSources.order
	});

	return newOrder;
};

const isPopularProduct = (
	productRepresentation: { code: string },
	_args: unknown,
	context: ApolloContext
) => getIsProductPopularAction(productRepresentation.code, {
	shopCartRepository: context.dataSources.shopCart
});

export const resolvers = {
	ShopCart: {
		id: (root: { _id: unknown; id: unknown; }) => root._id || root.id
	},
	Product: {
		isPopular: isPopularProduct
	},
	Query: {
		shopCart: getUserShopCart
	},
	Mutation: {
		addToShopCart,
		removeFromShopCart,
		updateInShopCart,
		saveShippingAddress,
		checkout
	}
};

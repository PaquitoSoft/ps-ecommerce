import { gql } from '@apollo/client';
import type { ShopCart, PaymentData, ShippingAddress } from '@ps-ecommerce/types';
// import { GraphQLResolveInfo } from 'graphql';

import type { ApolloContext } from '@ps-ecommerce/shared-server';

import {
	repositoryFactory as CheckoutRepositoryFactory,
	repositoryTypes as CheckoutRepositoryTypes
} from '../../../../../index';
import {
	repositoryFactory as CustomerRepositoryFactory,
	repositoryTypes as CustomerRepositoryTypes,
	OrderRepository
} from '@ps-ecommerce/customer-backend';
import {
	repositoryFactory as CatalogRepositoryFactory,
	repositoryTypes as CatalogRepositoryTypes,
	ProductRepository
} from '@ps-ecommerce/catalog-backend';

import type { ShopCartRepository } from '../../../../domain/shop-cart/shop-cart-repo';

import getUserShopCartAction from '../../../../application/use-cases/shop-cart/get-user-shop-cart-action';
import addToShopCartAction from '../../../../application/use-cases/shop-cart/add-product-to-cart-action';
import removeProductFromCartAction from '../../../../application/use-cases/shop-cart/remove-product-from-cart-action';
import updateProductInCartAction from '../../../../application/use-cases/shop-cart/update-product-in-cart-action';
import saveShippingAddressInCartAction from '../../../../application/use-cases/shop-cart/save-shipping-address-in-cart-action';
import checkoutAction from '../../../../application/use-cases/shop-cart/checkout-action';


export const typeDef = gql`
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
		checkout(paymentData: NewPaymentData): Order
	}
`;

const getUserShopCart = async (
	_parent: ShopCart,
	_args: unknown,
	context: ApolloContext,
	// info: GraphQLResolveInfo
) => {
	const userId = context.userId as string;

	const shopCartRepository = await CheckoutRepositoryFactory.build<ShopCartRepository>(CheckoutRepositoryTypes.ShopCart);
	const shopCart = await getUserShopCartAction(userId, { shopCartRepository });
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

	const shopCartRepository = await CheckoutRepositoryFactory.build<ShopCartRepository>(CheckoutRepositoryTypes.ShopCart);
	const productRepository = await CatalogRepositoryFactory.build<ProductRepository>(CatalogRepositoryTypes.Product);
	const shopCart = await addToShopCartAction(userId, productCode, sizeCode, {
		shopCartRepository,
		productRepository
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

	const shopCartRepository = await CheckoutRepositoryFactory.build<ShopCartRepository>(CheckoutRepositoryTypes.ShopCart);
	const shopCart = await removeProductFromCartAction(userId, orderItemId, { shopCartRepository });

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

	const shopCartRepository = await CheckoutRepositoryFactory.build<ShopCartRepository>(CheckoutRepositoryTypes.ShopCart);
	const shopCart = await updateProductInCartAction(userId, orderItemId, quantity, { shopCartRepository });

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

	const shopCartRepository = await CheckoutRepositoryFactory.build<ShopCartRepository>(CheckoutRepositoryTypes.ShopCart);
	const shopCart = await saveShippingAddressInCartAction(userId, shippingAddress, { shopCartRepository });

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

	const shopCartRepository = await CheckoutRepositoryFactory.build<ShopCartRepository>(CheckoutRepositoryTypes.ShopCart);
	const orderRepository = await CustomerRepositoryFactory.build<OrderRepository>(CustomerRepositoryTypes.Order);
	const newOrder = await checkoutAction(userId, paymentData, { shopCartRepository, orderRepository });

	return newOrder;
};

export const resolvers = {
	ShopCart: {
		id: (root: { _id: unknown; id: unknown; }) => root._id || root.id
	},
	Query: {
		shopCart: getUserShopCart
	},
	Mutation: { addToShopCart, removeFromShopCart, updateInShopCart, saveShippingAddress, checkout }
};

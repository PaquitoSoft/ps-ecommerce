import { gql } from '@apollo/client';
import { GraphQLResolveInfo } from 'graphql';

import { buildRepository, RepositoryType } from '@infra/repositories/repository-factory';
import getUserShopCartAction from '@useCases/shop-cart/get-user-shop-cart-action';
import addToShopCartAction from '@useCases/shop-cart/add-product-to-cart-action';

import ShopCartRepository from '@domain/shop-cart/shop-cart-repo';
import ProductRepository from '@domain/product/product-repo';
import removeProductFromCartAction from '@useCases/shop-cart/remove-product-from-cart-action';
import updateProductInCartAction from '@useCases/shop-cart/update-product-in-cart-action';
import ShippingAddress from '@app-types/shipping-address';
import saveShippingAddressInCartAction from '@useCases/shop-cart/save-shipping-address-in-cart-action';
import PaymentData from '@app-types/payment-data';
import checkoutAction from '@useCases/shop-cart/checkout-action';
import OrderRepository from '@domain/order/order-repo';

export const typeDef = gql`
	type ShopCartProduct {
		id: ID!
		code: String!
		name: String!
		sizeCode: String!
		sizeName: String!
		price: Int!
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

const getUserShopCart = async (parent: any, args: any, context: ApolloContext, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;

	const shopCartRepository = await buildRepository<ShopCartRepository>(RepositoryType.ShopCart);
	const shopCart = await getUserShopCartAction(userId, { shopCartRepository });
	return shopCart;
};

const addToShopCart = async (parent: any, args: any, context: ApolloContext, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;
	const productCode = args.productCode as string;
	const sizeCode = args.sizeCode as string;

	const shopCartRepository = await buildRepository<ShopCartRepository>(RepositoryType.ShopCart);
	const productRepository = await buildRepository<ProductRepository>(RepositoryType.Product);
	const shopCart = await addToShopCartAction(userId, productCode, sizeCode, {
		shopCartRepository,
		productRepository
	});

	return shopCart;
};

const removeFromShopCart = async (parent: any, args: any, context: ApolloContext, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;
	const orderItemId = args.orderItemId as string;

	const shopCartRepository = await buildRepository<ShopCartRepository>(RepositoryType.ShopCart);
	const shopCart = await removeProductFromCartAction(userId, orderItemId, { shopCartRepository });

	return shopCart;
};

const updateInShopCart = async (parent: any, args: any, context: ApolloContext, info: GraphQLResolveInfo) => {
	const userId = context.userId as string;
	const orderItemId = args.orderItemId as string;
	const quantity = args.quantity as number;

	const shopCartRepository = await buildRepository<ShopCartRepository>(RepositoryType.ShopCart);
	const shopCart = await updateProductInCartAction(userId, orderItemId, quantity, { shopCartRepository });

	return shopCart;
};

const saveShippingAddress = async (parent: any, args: any, context: ApolloContext) => {
	const userId = context.userId as string;
	const shippingAddress = args.shippingAddress as ShippingAddress;

	const shopCartRepository = await buildRepository<ShopCartRepository>(RepositoryType.ShopCart);
	const shopCart = await saveShippingAddressInCartAction(userId, shippingAddress, { shopCartRepository });

	return shopCart;
};

const checkout = async (parent: any, args: any, context: ApolloContext) => {
	const userId = context.userId as string;
	const paymentData = args.paymentData as PaymentData;

	const shopCartRepository = await buildRepository<ShopCartRepository>(RepositoryType.ShopCart);
	const orderRepository = await buildRepository<OrderRepository>(RepositoryType.Order);
	const newOrder = await checkoutAction(userId, paymentData, { shopCartRepository, orderRepository });

	return newOrder;
};

export const resolvers = {
	ShopCart: {
		id: (root: { _id: any; id: any; }) => root._id || root.id
	},
	Query: {
		shopCart: getUserShopCart
	},
	Mutation: { addToShopCart, removeFromShopCart, updateInShopCart, saveShippingAddress, checkout }
};

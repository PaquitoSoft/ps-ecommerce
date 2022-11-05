import { gql } from "@apollo/client";

import ApolloContext from '../apollo-context';

import getUserLastOrdersAction from "../../../../application/use-cases/order/get-user-last-order-action";
import getUserOrderAction from "../../../../application/use-cases/order/get-user-order-action";
import getUserOrdersAction from "../../../../application/use-cases/order/get-user-orders-action";

export const typeDef = gql`
	type OrderItemProduct {
		code: String!
		name: String!
		sizeCode: String!
		sizeName: String!
		price: Float!
		colorName: String!
		imageUrl: String!
	}

	type OrderItem {
		id: ID!
		product: OrderItemProduct!
		quantity: Int!
	}

	type Order {
		id: String!
		code: String!
		userId: String!
		items: [OrderItem]!
		placedDate: BigInt!
		estimatedDeliveryDate: BigInt!
		totalUnits: Int!
		deliveryCost: Float
		totalAmount: Float!
		shippingAddress: OrderShippingAddress!
		paymentData: OrderPaymentData!
	}

	extend type Query {
		userOrders: [Order]!
		userLastOrder: Order
		order(orderCode: String!): Order
	}
`;

const getUserOrdersList = async (
	_root: unknown,
	_args: unknown,
	context: ApolloContext
) => {
	const userId = context.userId;

	const orders = await getUserOrdersAction(userId, {
		orderRepository: context.dataSources.order
	});

	return orders;
};

const getUserOrderDetails = async (
	_root: unknown,
	args: { orderCode: string },
	context: ApolloContext
) => {
	const userId = context.userId;
	const orderCode = args.orderCode;

	const order = await getUserOrderAction(userId, orderCode, {
		orderRepository: context.dataSources.order
	});

	return order;
};

const getUserLastOrder = async (
	_root: unknown,
	_args: unknown,
	context: ApolloContext
) => {
	const userId = context.userId as string;

	const orders = await getUserLastOrdersAction(userId, {
		orderRepository: context.dataSources.order
	});

	return orders;
};

export const resolvers = {
	Order: {
		id: (root: { _id: unknown; id: unknown; }) => root._id || root.id
	},
	Query: {
		userOrders: getUserOrdersList,
		userLastOrder: getUserLastOrder,
		order: getUserOrderDetails
	}
};

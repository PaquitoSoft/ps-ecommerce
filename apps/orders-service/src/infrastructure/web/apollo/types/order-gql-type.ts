import { gql } from '@apollo/client';
import { Order } from '@ps-ecommerce/types';

import ApolloContext from '../apollo-context';

import getUserLastOrdersAction from '../../../../application/use-cases/order/get-user-last-order-action';
import getUserOrderAction from '../../../../application/use-cases/order/get-user-order-action';
import getUserOrdersAction from '../../../../application/use-cases/order/get-user-orders-action';
import createOrderAction from '../../../../application/use-cases/order/create-order-action';

export const typeDef = gql`
	extend schema
		@link(url: "https://specs.apollo.dev/federation/v2.0",
			import: ["@inaccessible"])

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

	input NewOrderItemProduct @inaccessible {
		code: String!
		name: String!
		sizeCode: String!
		sizeName: String!
		price: Float!
		colorName: String!
		imageUrl: String!
	}

	input NewOrderItem @inaccessible {
		product: NewOrderItemProduct!
		quantity: Int!
	}

	input NewOrderShippingAddress @inaccessible {
		email: String!
		name: String!
		surname: String!
		addressLine: String!
		postalCode: String!
		city: String!
	}

	input NewPaymentCreditCard @inaccessible {
		pan: String!
		cardholder: String!
	}

	input NewOrderPaymentData @inaccessible {
		paymentMethod: String!
		paymentDetails: NewPaymentCreditCard!
	}

	input NewOrder @inaccessible {
		userId: String!
		items: [NewOrderItem]!
		shippingAddress: NewOrderShippingAddress!
		paymentData: NewOrderPaymentData!
	}

	extend type Query {
		userOrders: [Order]!
		userLastOrder: Order
		order(orderCode: String!): Order
	}

	extend type Mutation {
		createOrder(newOrder: NewOrder!): Order @inaccessible
	}
`;

const getUserOrdersList = async (
	_root: unknown,
	_args: unknown,
	context: ApolloContext
) => {
	const userId = context.userId;

	const orders = await getUserOrdersAction(userId, {
		orderRepository: context.dataSources.order,
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
		orderRepository: context.dataSources.order,
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
		orderRepository: context.dataSources.order,
	});

	return orders;
};

const createOrder = (
	_root: unknown,
	args: { newOrder: Order },
	context: ApolloContext
) => {
	return createOrderAction(args.newOrder, {
		orderRepository: context.dataSources.order,
	});
};

export const resolvers = {
	Order: {
		id: (root: { _id: unknown; id: unknown }) => root._id || root.id,
	},
	Query: {
		userOrders: getUserOrdersList,
		userLastOrder: getUserLastOrder,
		order: getUserOrderDetails,
	},
	Mutation: {
		createOrder,
	},
};

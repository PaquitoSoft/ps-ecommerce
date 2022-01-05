import { gql } from "@apollo/client";

import { buildRepository, RepositoryType } from "../../../repositories/repository-factory";
import getUserLastOrdersAction from "../../../../application/use-cases/order/get-user-last-order-action";
import getUserOrderAction from "../../../../application/use-cases/order/get-user-order-action";
import getUserOrdersAction from "../../../../application/use-cases/order/get-user-orders-action";

import OrderRepository from "../../../../domain/order/order-repo";

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
		shippingAddress: ShippingAddress!
		paymentData: PaymentData!
	}

	extend type Query {
		userOrders: [Order]!
		userLastOrder: Order
		order(orderCode: String!): Order
	}
`;

const getUserOrdersList = async (root: any, args: any, context: any) => {
	const userId = context.userId as string;

	const orderRepository = await buildRepository<OrderRepository>(RepositoryType.Order);
	const orders = await getUserOrdersAction(userId, { orderRepository });

	return orders;
};

const getUserOrderDetails = async (root: any, args: any, context: any) => {
	const userId = context.userId as string;
	const orderCode = args.orderCode as string;

	const orderRepository = await buildRepository<OrderRepository>(RepositoryType.Order);
	const order = await getUserOrderAction(userId, orderCode, { orderRepository });

	return order;
};

const getUserLastOrder = async (root: any, args: any, context: any) => {
	const userId = context.userId as string;

	const orderRepository = await buildRepository<OrderRepository>(RepositoryType.Order);
	const orders = await getUserLastOrdersAction(userId, { orderRepository });

	return orders;
};

export const resolvers = {
	Order: {
		id: (root: { _id: any; id: any; }) => root._id || root.id
	},
	Query: {
		userOrders: getUserOrdersList,
		userLastOrder: getUserLastOrder,
		order: getUserOrderDetails
	}
};

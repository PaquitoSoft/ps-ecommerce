import OrderRepository from "@domain/order/order-repo";
import OrderModel from "@infra/orm/mongoose/models/order-model";

import Order from "@app-types/order";

const MongoOrderRepository: OrderRepository = {
	async create(order: Order): Promise<Order> {
		const newOrder = new OrderModel(order);
		return newOrder.save();
	},

	async findByUser(userId: string): Promise<Order[]> {
		return OrderModel.find({ userId }, null, { sort: { placedDate: -1 } });
	},

	async getLastUserOrder(userId: string): Promise<Order> {
		const order = await OrderModel.findOne({ userId }, null, { sort: { placedDate: -1 } });
		return order!;
	},

	async findOrderByUser(userId: string, orderCode: string): Promise<Order> {
		const order = await OrderModel.findOne({ userId, code: orderCode });
		return order!;
	}
}

export default MongoOrderRepository;

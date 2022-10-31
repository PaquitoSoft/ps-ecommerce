import type { Order } from "@ps-ecommerce/types";
import type { Repository } from '@ps-ecommerce/shared-server';

interface OrderRepository extends Repository {
	create(order: Order): Promise<Order>;
	findByUser(userId: string): Promise<Order[]>;
	getLastUserOrder(userId: string): Promise<Order>;
	findOrderByUser(userId: string, orderCode: string): Promise<Order>;
};

export default OrderRepository;

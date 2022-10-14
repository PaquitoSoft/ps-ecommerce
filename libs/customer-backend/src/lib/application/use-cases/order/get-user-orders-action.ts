import { Order } from '@ps-ecommerce/types';
import OrderRepository from '../../../domain/order/order-repo';

function getUserOrdersActions(
	userId: string,
	{ orderRepository }: { orderRepository: OrderRepository }
): Promise<Order[]> {
	return orderRepository.findByUser(userId);
}

export default getUserOrdersActions;

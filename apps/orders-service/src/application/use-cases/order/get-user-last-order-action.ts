import { Order } from '@ps-ecommerce/types';
import OrderRepository from '../../../domain/order-repo';

function getUserLastOrdersAction(
	userId: string,
	{ orderRepository }: { orderRepository: OrderRepository }
): Promise<Order> {
	return orderRepository.getLastUserOrder(userId);
}

export default getUserLastOrdersAction;

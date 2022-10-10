import Order from "@app-types/order";
import OrderRepository from "@domain/order/order-repo";

function getUserOrdersActions(
	userId: string,
	{ orderRepository }: { orderRepository: OrderRepository }
): Promise<Order[]> {
	return orderRepository.findByUser(userId);
}

export default getUserOrdersActions;

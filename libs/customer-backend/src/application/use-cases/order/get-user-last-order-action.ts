import Order from "@app-types/order";
import OrderRepository from "@domain/order/order-repo";

function getUserLastOrdersAction(
	userId: string,
	{ orderRepository }: { orderRepository: OrderRepository }
): Promise<Order> {
	return orderRepository.getLastUserOrder(userId);
}

export default getUserLastOrdersAction;

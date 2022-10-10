import Order from "@app-types/order";
import OrderRepository from "@domain/order/order-repo";

function getUserOrderAction(
	userId: string,
	orderCode: string,
	{ orderRepository }: { orderRepository: OrderRepository }
): Promise<Order> {
	return orderRepository.findOrderByUser(userId, orderCode);
}

export default getUserOrderAction;

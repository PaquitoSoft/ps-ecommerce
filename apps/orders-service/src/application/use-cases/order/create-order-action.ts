import { v4 as uuiv4 } from 'uuid';
import type { Order } from '@ps-ecommerce/types';
import type NewOrder from '../../../types/new-order';
import OrderRepository from '../../../domain/order-repo';

function getRandomDeliveryDate() {
	const d = new Date();
	const randomDays = Math.random() * (5 - 1) + 1; // Ger a random day between 1 and 5
	d.setDate(d.getDate() + Math.trunc(randomDays));
	return d;
}

async function createOrderAction(
	newOrder: NewOrder,
	{ orderRepository }: { orderRepository: OrderRepository }
): Promise<Order> {
	const totals = newOrder.items.reduce<{ units: number; amount: number }>(
		(agg, item) => {
			return {
				units: agg.units + item.quantity,
				amount: agg.amount + item.quantity * item.product.price,
			};
		},
		{ units: 0, amount: 0 }
	);

	return orderRepository.create({
		...newOrder,
		code: uuiv4().split('-')[0].toUpperCase(),
		totalUnits: totals.units,
		totalAmount: totals.amount,
		placedDate: Date.now(),
		estimatedDeliveryDate: getRandomDeliveryDate().getTime(),
		deliveryCost: 0,
	});
}

export default createOrderAction;

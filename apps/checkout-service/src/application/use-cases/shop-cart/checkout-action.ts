import { v4 as uuiv4 } from 'uuid';
import type { Order, PaymentData } from '@ps-ecommerce/types';

import type ShopCartRepository from '../../../domain/shop-cart-repo';
import type OrderRepository from '../../../domain/order-repo';

type Repositories = {
	shopCartRepository: ShopCartRepository;
	orderRepository: OrderRepository;
};

function getRandomDeliveryDate() {
	const d = new Date();
	const randomDays = Math.random() * (5 - 1) + 1; // Ger a random day between 1 and 5
	d.setDate(d.getDate() + Math.trunc(randomDays));
	return d;
}

async function checkoutAction(
	userId: string,
	paymentData: PaymentData,
	{ shopCartRepository, orderRepository }: Repositories
): Promise<Order> {
	const shopCart = await shopCartRepository.findByUser(userId);

	if (!shopCart) {
		throw new Error('Shop cart not found');
	}

	const totals = shopCart.items.reduce<{ units: number, amount: number }>((agg, item) => {
		return {
			units: agg.units + item.quantity,
			amount: agg.amount + item.quantity * item.product.price,
		}
	}, { units: 0, amount: 0 });

	const order: Order = {
		id: '',
		code: uuiv4().split('-')[0].toUpperCase(),
		deliveryCost: 0,
		placedDate: Date.now(),
		estimatedDeliveryDate: getRandomDeliveryDate().getTime(),
		userId,
		items: shopCart.items,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		shippingAddress: shopCart.shippingAddress!,
		paymentData: {
			...paymentData,
			paymentDetails: {
				...paymentData.paymentDetails,
				pan: `**** **** **** ${paymentData.paymentDetails.pan.substring(paymentData.paymentDetails.pan.length - 4)}`
			}
		},
		totalUnits: totals.units,
		totalAmount: totals.amount
	};

	const [newOrder] = await Promise.all([
		orderRepository.create(order),
		shopCartRepository.removeUserCart(userId)
	]);

	return newOrder;
}

export default checkoutAction;

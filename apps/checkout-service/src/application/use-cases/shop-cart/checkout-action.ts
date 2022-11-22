import type { Order, PaymentData, ShopCart } from '@ps-ecommerce/types';

import type ShopCartRepository from '../../../domain/shop-cart-repo';
import type OrderRepository from '../../../domain/order-repo';
import type CustomerNewOrder from '../../../types/customer-new-order';

type Repositories = {
	shopCartRepository: ShopCartRepository;
	orderRepository: OrderRepository;
};

function createCustomerOrder({ shopCart, paymentData, userId }: {
	shopCart: ShopCart,
	paymentData: PaymentData,
	userId: string,
}): CustomerNewOrder {
	return {
		userId,
		items: shopCart.items.map(item => ({
			quantity: item.quantity,
			product: {
				code: item.product.code,
				name: item.product.name,
				sizeCode: item.product.sizeCode,
				sizeName: item.product.sizeName,
				price: item.product.price,
				colorName: item.product.colorName,
				imageUrl: item.product.imageUrl
			}
		})),

		shippingAddress: {
			email: shopCart.shippingAddress!.email,
			name: shopCart.shippingAddress!.name,
			surname: shopCart.shippingAddress!.surname,
			addressLine: shopCart.shippingAddress!.addressLine,
			postalCode: shopCart.shippingAddress!.postalCode,
			city: shopCart.shippingAddress!.city,
		},
		paymentData: {
			paymentMethod: paymentData.paymentMethod,
			paymentDetails: {
				cardholder: paymentData.paymentDetails.cardholder,
				pan: `**** **** **** ${paymentData.paymentDetails.pan.substring(paymentData.paymentDetails.pan.length - 4)}`
			}
		},
	};
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

	const [newOrder] = await Promise.all([
		orderRepository.create(createCustomerOrder({
			shopCart,
			paymentData,
			userId
		})),
		shopCartRepository.removeUserCart(userId)
	]);

	return newOrder;
}

export default checkoutAction;

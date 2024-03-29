import type { ShopCart } from '@ps-ecommerce/types';

import type ShopCartRepository from '../../../domain/shop-cart-repo';

async function removeProductFromCartAction(
	userId: string,
	orderItemId: string,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<ShopCart> {
	const shopCart = await shopCartRepository.findByUser(userId);

	if (!shopCart) {
		throw new Error('Shop cart not found');
	}

	const orderItemIndex = shopCart.items.findIndex(item => item.id === orderItemId);
	if (orderItemIndex === -1) {
		throw new Error('Order item not found');
	} else {
		shopCart.totalUnits -= shopCart.items[orderItemIndex].quantity;
		shopCart.items.splice(orderItemIndex, 1);
	}

	return shopCartRepository.updateUserCart(userId, shopCart);
}

export default removeProductFromCartAction;

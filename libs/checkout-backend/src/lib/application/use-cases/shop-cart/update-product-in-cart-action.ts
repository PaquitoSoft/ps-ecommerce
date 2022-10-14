import type { ShopCart } from '@ps-ecommerce/types';

import type { ShopCartRepository } from '../../../domain/shop-cart/shop-cart-repo';

async function updateProductInCartAction(
	userId: string,
	orderItemId: string,
	quantity: number,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<ShopCart> {
	const shopCart = await shopCartRepository.findByUser(userId);

	if (!shopCart) {
		throw new Error('Shop cart not found');
	}

	shopCart.totalUnits = 0;
	shopCart.items = shopCart.items.map(item => {
		if (item.id === orderItemId) {
			item.quantity = quantity;
		}
		shopCart.totalUnits += item.quantity;
		return item;
	});

	return shopCartRepository.updateUserCart(userId, shopCart);
}

export default updateProductInCartAction;

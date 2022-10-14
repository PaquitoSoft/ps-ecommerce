import type { ShopCart } from '@ps-ecommerce/types';

import type { ShopCartRepository } from '../../../domain/shop-cart/shop-cart-repo';

function getUserShopCartAction(
	userId: string,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<ShopCart> {
	return shopCartRepository.findByUser(userId);
}

export default getUserShopCartAction;

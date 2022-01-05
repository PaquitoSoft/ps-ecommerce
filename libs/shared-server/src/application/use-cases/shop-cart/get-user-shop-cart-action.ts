import ShopCartRepository from '../../../domain/shop-cart/shop-cart-repo';

import { ShopCart } from '@ps-ecommerce/types';

function getUserShopCartAction(
	userId: string,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<ShopCart> {
	return shopCartRepository.findByUser(userId);
}

export default getUserShopCartAction;

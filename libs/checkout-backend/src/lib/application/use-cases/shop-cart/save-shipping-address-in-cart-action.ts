import type { ShopCart, ShippingAddress } from '@ps-ecommerce/types';

import type { ShopCartRepository } from '../../../domain/shop-cart/shop-cart-repo';

async function saveShippingAddressInCartAction(
	userId: string,
	shippingAddress: ShippingAddress,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<ShopCart> {
	const shopCart = await shopCartRepository.findByUser(userId);

	if (!shopCart) {
		throw new Error('Shop cart not found');
	}

	shopCart.shippingAddress = shippingAddress;

	return shopCartRepository.updateUserCart(userId, shopCart);
}

export default saveShippingAddressInCartAction;

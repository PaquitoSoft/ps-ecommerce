import ShopCartRepository from "@domain/shop-cart/shop-cart-repo";

import ShopCart from "@app-types/shop-cart";

function getUserShopCartAction(
	userId: string,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<ShopCart> {
	return shopCartRepository.findByUser(userId);
}

export default getUserShopCartAction;

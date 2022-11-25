import type ShopCartRepository from '../../../domain/shop-cart-repo';

const POPULAR_PRODUCT_CARTS_THRESHOLD = 0;

async function getUserShopCartAction(
	productCode: string,
	{ shopCartRepository }: { shopCartRepository: ShopCartRepository }
): Promise<boolean> {
	const shopCartsCount = await shopCartRepository.countCartsWithProducts(productCode);

	return shopCartsCount > POPULAR_PRODUCT_CARTS_THRESHOLD;
}

export default getUserShopCartAction;

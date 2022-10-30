import type { ShopCart, ShopCartItem, Product, Size } from '@ps-ecommerce/types';

import type ShopCartRepository from "../../../domain/shop-cart-repo";
import type ProductRepository from '../../../domain/product-repo';

function createShopCartItem(product: Product, size: Size): ShopCartItem {
	return {
		id: '',
		product: {
			id: product.id,
			code: product.code,
			name: product.name,
			colorName: product.colorName,
			sizeCode: size.code,
			sizeName: size.name,
			price: product.price,
			imageUrl: product.gridImages[0]
		},
		quantity: 1
	}
};

async function addProductToCart(
	userId: string,
	productCode: string,
	sizeCode: string,
	{ shopCartRepository, productRepository }:
	{ shopCartRepository: ShopCartRepository, productRepository: ProductRepository }
): Promise<ShopCart> {
	const shopCart = await shopCartRepository.findByUser(userId);

	const product = await productRepository.findByProductCode(productCode);

	if (!product) {
		throw new Error('Product not found');
	}

	const size = product.sizes.find(size => size.code === sizeCode);

	if (!size) {
		throw new Error('Size not found');
	}

	if (!shopCart.id) {
		return shopCartRepository.createUserCart({
			id: '',
			userId,
			items: [createShopCartItem(product, size)],
			totalUnits: 0,
			estimatedDeliveryCost: 0,
			totalAmount: 0
		});
	}

	const orderItem = shopCart.items.find(item =>
		item.product.code === product.code && item.product.sizeCode === size.code
	);

	if (orderItem) {
		orderItem.quantity += 1;
	} else {
		// shopCart.items.push({
		// 	id: '',
		// 	product: {
		// 		id: product.id,
		// 		code: product.code,
		// 		name: product.name,
		// 		colorName: product.colorName,
		// 		sizeCode: size.code,
		// 		sizeName: size.name,
		// 		price: product.price,
		// 		imageUrl: product.gridImages[0]
		// 	},
		// 	quantity: 1
		// });
		shopCart.items.push(createShopCartItem(product, size));
	}
	shopCart.totalUnits += 1;

	return shopCartRepository.updateUserCart(userId, shopCart);
}

export default addProductToCart;

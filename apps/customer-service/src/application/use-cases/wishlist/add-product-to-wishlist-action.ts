import { Types } from "mongoose";
import { Wishlist, Product } from '@ps-ecommerce/types';

import WishlistRepository from '../../../domain/wishlist-repo';

async function addProductTpWishlistAction(
	userId: string,
	productId: string,
	{ wishlistRepository }: { wishlistRepository: WishlistRepository }
): Promise<Wishlist> {

	let wishlist = await wishlistRepository.findByUser(userId);
	const _productId = new Types.ObjectId(productId);

	if (wishlist) {
		const productIds = (wishlist.products as Product[]).map(product => new Types.ObjectId(product.id));
		productIds.push(_productId);
		wishlist = await wishlistRepository.updateUserWishlist(userId, productIds);
	} else {
		wishlist = await wishlistRepository.createWishlist({
			id: '',
			name: 'My wishlist',
			userId,
			productsIds: [_productId],
			// products: [_productId]
			products: []
		});
	}

	return wishlist;
}

export default addProductTpWishlistAction;

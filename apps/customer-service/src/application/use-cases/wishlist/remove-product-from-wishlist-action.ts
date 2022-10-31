import { Types } from "mongoose";
import { Wishlist } from '@ps-ecommerce/types';

import WishlistRepository from '../../../domain/wishlist-repo';

async function removeProductFromWishlistAction(
	userId: string,
	productId: string,
	{ wishlistRepository }: { wishlistRepository: WishlistRepository }
): Promise<Wishlist> {

	const wishlist = await wishlistRepository.findByUser(userId);
	const _productId = new Types.ObjectId(productId);

	if (!wishlist) {
		throw Error('No wishlist found for this user');
	}

	const productIndex = wishlist.productsIds.findIndex(wishlistProductId => {
		return wishlistProductId.equals(_productId);
	});

	if (productIndex === -1) {
		throw new Error('Product to be remove does not exist in this wishlist');
	}

	wishlist.productsIds.splice(productIndex, 1);

	return wishlistRepository.updateUserWishlist(userId, wishlist.productsIds);
}

export default removeProductFromWishlistAction;

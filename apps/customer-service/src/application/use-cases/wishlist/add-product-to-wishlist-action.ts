import { Types } from "mongoose";
import { Wishlist } from '@ps-ecommerce/types';

import WishlistRepository from '../../../domain/wishlist-repo';

async function addProductTpWishlistAction(
	userId: string,
	productId: string,
	{ wishlistRepository }: { wishlistRepository: WishlistRepository }
): Promise<Wishlist> {

	let wishlist = await wishlistRepository.findByUser(userId);
	const _productId = new Types.ObjectId(productId);

	if (wishlist) {
		wishlist = await wishlistRepository.updateUserWishlist(
			userId,
			wishlist.productsIds.concat(_productId)
		);
	} else {
		wishlist = await wishlistRepository.createWishlist({
			id: '',
			name: 'My wishlist',
			userId,
			productsIds: [_productId],
			products: []
		});
	}

	return wishlist;
}

export default addProductTpWishlistAction;

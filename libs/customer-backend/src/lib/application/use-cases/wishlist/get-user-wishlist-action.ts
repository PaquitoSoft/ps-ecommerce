import { Wishlist } from '@ps-ecommerce/types';

import WishlistRepository from '../../../domain/wishlist/wishlist-repo';

function getUserWishlistAction(
	userId: string,
	{ wishlistRepository }: { wishlistRepository: WishlistRepository }
): Promise<Wishlist | null> {
	return wishlistRepository.findByUser(userId);
}

export default getUserWishlistAction;

import WishlistRepository from "@domain/wishlist/wishlist-repo";
import Wishlist from "@app-types/wishlist";

function getUserWishlistAction(
	userId: string,
	{ wishlistRepository }: { wishlistRepository: WishlistRepository }
): Promise<Wishlist | null> {
	return wishlistRepository.findByUser(userId);
}

export default getUserWishlistAction;

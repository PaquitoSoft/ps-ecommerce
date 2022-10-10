import { Types } from "mongoose";
import WishlistRepository from "@domain/wishlist/wishlist-repo";
import Wishlist from "@app-types/wishlist";
import Product from "@app-types/product";

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

	const productIndex = wishlist.products.findIndex(wishlistProductId => {
		return (wishlistProductId as Types.ObjectId).equals(_productId);
	});

	if (productIndex === -1) {
		throw new Error('Product to be remove does not exist in this wishlist');
	}

	wishlist.products.splice(productIndex, 1);

	return wishlistRepository.updateUserWishlist(userId, wishlist.products as Product[]);
}

export default removeProductFromWishlistAction;

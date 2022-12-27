import { Types } from "mongoose";
import { Wishlist } from '@ps-ecommerce/types';
import { Repository } from '@ps-ecommerce/shared-server';

interface WishlistRepository extends Repository {
	findByUser(userId: string): Promise<Wishlist | null>;
	createWishlist(wishlist: Wishlist): Promise<Wishlist>;
	updateUserWishlist (userId: string, productsIds: Types.ObjectId[]): Promise<Wishlist>;
};

export default WishlistRepository;

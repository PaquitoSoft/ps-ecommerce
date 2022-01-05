import { Types } from "mongoose";
import { Wishlist, Product } from '@ps-ecommerce/types';
import Repository from '../repository';

interface WishlistRepository extends Repository {
	findByUser(userId: string): Promise<Wishlist | null>;
	createWishlist(wishlist: Wishlist): Promise<Wishlist>;
	updateUserWishlist (userId: string, products: Product[] | Types.ObjectId[]): Promise<Wishlist>;
};

export default WishlistRepository;

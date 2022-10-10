import { Types } from "mongoose";
import Wishlist from "@app-types/wishlist";
import Product from "@app-types/product";
import Repository from "@domain/repository";

interface WishlistRepository extends Repository {
	findByUser(userId: string): Promise<Wishlist | null>;
	createWishlist(wishlist: Wishlist): Promise<Wishlist>;
	updateUserWishlist (userId: string, products: Product[] | Types.ObjectId[]): Promise<Wishlist>;
};

export default WishlistRepository;

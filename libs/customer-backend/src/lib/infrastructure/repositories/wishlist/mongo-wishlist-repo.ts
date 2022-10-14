import { Types } from "mongoose";
import WishlistModel from "../../orm/mongoose/models/wishlist-model";

import { Wishlist, Product } from "@ps-ecommerce/types";
import WishlistRepository from "../../../domain/wishlist/wishlist-repo";

const MongoWishlistRepository: WishlistRepository = {
	async findByUser(userId: string): Promise<Wishlist | null> {
		return WishlistModel.findOne({ userId });
	},

	async createWishlist(wishlist: Wishlist): Promise<Wishlist> {
		const model = new WishlistModel(wishlist);
		return model.save();
	},

	async updateUserWishlist(userId: string, products: Product[] | Types.ObjectId[]): Promise<Wishlist> {
		const userWishlist = await WishlistModel.findOne({ userId });

		if (!userWishlist) {
			throw new Error('Wishlist not found');
		}

		userWishlist.products = products;

		return userWishlist.save();
	}
};

export default MongoWishlistRepository;

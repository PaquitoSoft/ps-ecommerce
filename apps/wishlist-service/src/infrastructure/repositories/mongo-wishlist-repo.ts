import { Types } from "mongoose";
import { DataSource } from "apollo-datasource";
import type { Wishlist } from "@ps-ecommerce/types";

import WishlistModel from "../orm/mongoose/models/wishlist-model";
import type WishlistRepository from "../../domain/wishlist-repo";

class MongoWishlistRepository extends DataSource implements WishlistRepository {
	async findByUser(userId: string): Promise<Wishlist | null> {
		return WishlistModel.findOne({ userId });
	}

	async createWishlist(wishlist: Wishlist): Promise<Wishlist> {
		const model = new WishlistModel(wishlist);
		return model.save();
	}

	async updateUserWishlist(userId: string, productsIds: Types.ObjectId[]): Promise<Wishlist> {
		const userWishlist = await WishlistModel.findOne({ userId });

		if (!userWishlist) {
			throw new Error('Wishlist not found');
		}

		userWishlist.productsIds = productsIds;

		return userWishlist.save();
	}
};

export default MongoWishlistRepository;

import { connectToMongo } from "@infra/orm/mongoose/mongoose-connection";

import MongoOrderRepository from "./order/mongo-order-repo";
import MongoShopCartRepository from "./shopcart/mongo-shop-cart-repo";
import WishlistRepository from "./wishlist/mongo-wishlist-repo";
import MongoCategoryRepository from "./category/mongo-category-repo";
import MongoFooterLinkRepository from "./footer-link/mongo-footer-link-repo";
import MongoProductRepository from "./product/mongo-product-repo";

import Repository from "@domain/repository";
import Dictionary from "@app-types/dictionary";

export enum RepositoryType {
	Category = 'category-repo',
	Product = 'product-repo',
	FooterLink = 'footer-link-repo',
	ShopCart = 'shop-cart-repo',
	Order = 'mongo-order-repo',
	Wishlist = 'wishlist-repo'
};

const repositoriesMap: Dictionary<any> = {
	[RepositoryType.Category]: MongoCategoryRepository,
	[RepositoryType.Product]: MongoProductRepository,
	[RepositoryType.FooterLink]: MongoFooterLinkRepository,
	[RepositoryType.ShopCart]: MongoShopCartRepository,
	[RepositoryType.Order]: MongoOrderRepository,
	[RepositoryType.Wishlist]: WishlistRepository
};

export const buildRepository = async <T extends Repository>(type: RepositoryType): Promise<T> => {
	await connectToMongo();
	const repository = repositoriesMap[type] as T;
	
	if (!repository) {
		throw new Error(`Repository ${type} not found`);
	}

	return repository;
};

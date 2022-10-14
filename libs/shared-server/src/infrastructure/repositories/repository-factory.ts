import { connectToMongo } from "../orm/mongoose/mongoose-connection";

// import MongoFooterLinkRepository from "./footer-link/mongo-footer-link-repo";

import Repository from "../../domain/repository";
// import { Dictionary } from "@ps-ecommerce/types";

// export enum RepositoryType {
// 	Category = 'category-repo',
// 	Product = 'product-repo',
// 	FooterLink = 'footer-link-repo',
// 	ShopCart = 'shop-cart-repo',
// 	Order = 'mongo-order-repo',
// 	Wishlist = 'wishlist-repo'
// };

// const repositoriesMap: Dictionary<unknown> = {
// 	// [RepositoryType.Category]: MongoCategoryRepository,
// 	// [RepositoryType.Product]: MongoProductRepository,
// 	[RepositoryType.FooterLink]: MongoFooterLinkRepository,
// 	// [RepositoryType.ShopCart]: MongoShopCartRepository,
// 	// [RepositoryType.Order]: MongoOrderRepository,
// 	// [RepositoryType.Wishlist]: MongoWishlistRepository
// };

// /** @deprecated use RepositoryFactory class instead */
// export const buildRepository = async <T extends Repository>(type: RepositoryType): Promise<T> => {
// 	await connectToMongo();
// 	const repository = repositoriesMap[type] as T;

// 	if (!repository) {
// 		throw new Error(`Repository ${type} not found`);
// 	}

// 	return repository;
// };

type RepositoriesMapping = Record<string, Repository>;

class RepositoryFactory {

	private _repositoriesMap: RepositoriesMapping;

	constructor(repositoriesMap: RepositoriesMapping) {
		this._repositoriesMap = repositoriesMap;
	}

	async build<T extends Repository>(type: string): Promise<T> {
		await connectToMongo();
		const repository = this._repositoriesMap[type] as T;

		if (!repository) {
			throw new Error(`Repository ${type} not found`);
		}

		return repository;
	}
}

export default RepositoryFactory;

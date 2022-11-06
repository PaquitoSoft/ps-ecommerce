import { Types } from "mongoose";
import { DataSource } from "apollo-datasource";
import { Product } from "@ps-ecommerce/types";

import CategoryModel from "../orm/mongoose/models/category-model";
import ProductModel from "../orm/mongoose/models/product-model";

import ProductRepository, {
	FindPaginatedByCategoryCodeResult,
	FindProductsByCategoryCodeParams
} from "../../domain/product-repo";

class MongoProductRepository extends DataSource implements ProductRepository {

	async findByProductsIds(productsIds: string[]): Promise<Product[]> {
		const products = await ProductModel.find({
			_id: {
				$in: productsIds.map(id => new Types.ObjectId(id))
			}
		});

		return products;
	}

	async findByProductCode(productCode: string): Promise<Product> {
		const product = await ProductModel.findOne({ code: productCode });
		return product;
	}

	async findByCategoryCode({
		categoryCode,
		start,
		count,
		randomValues
	}: FindProductsByCategoryCodeParams): Promise<FindPaginatedByCategoryCodeResult> {
		const category = await CategoryModel.findOne({ code: categoryCode });
		const { products, totalCount } = await ProductModel.findPaginatedByCategory({
			categoryId: category?.id,
			start,
			count,
			isRandom: randomValues
		});

		return {
			products: products,
			totalCount
		};
	}
};

export default MongoProductRepository;

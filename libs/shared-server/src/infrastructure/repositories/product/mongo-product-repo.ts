import CategoryModel from "../../orm/mongoose/models/category-model";
import ProductModel from "../../orm/mongoose/models/product-model";

import { Product } from "@ps-ecommerce/types";

import ProductRepository, {
	FindPaginatedByCategoryCodeResult,
	FindProductsByCategoryCodeParams
} from "../../../domain/product/product-repo";

const MongoProductRepository: ProductRepository = {
	async findByProductCode(productCode: string): Promise<Product> {
		const product = await ProductModel.findOne({ code: productCode });
		return product!;
	},

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

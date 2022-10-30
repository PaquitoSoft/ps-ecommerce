import { DataSource } from "apollo-datasource";
import { Category } from "@ps-ecommerce/types";

import CategoryModel from "../orm/mongoose/models/category-model";
import CategoryRepository from "../../domain/category-repo";

class MongoCategoryRepository extends DataSource implements CategoryRepository {
	async getTree(): Promise<Category[]> {
		return CategoryModel
			.find({ isHidden: false, 'parent': { $exists: false }})
			.populate({
				path: 'subcategories',
				populate: {
					path: 'subcategories',
					model: 'Category'
				}
			});
	}

	async findByCode(categoryCode: string): Promise<Category> {
		const category = await CategoryModel.findOne({ code: categoryCode }, 'code name');
		return category!;
	}
};

export default MongoCategoryRepository;

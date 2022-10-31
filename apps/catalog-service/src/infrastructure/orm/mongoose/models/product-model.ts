import mongoose, { Model, PipelineStage } from 'mongoose';

import { Product } from '@ps-ecommerce/types';

type FindPaginatedByCategoryParams = {
	categoryId: string;
	start?: number;
	count?: number;
	isRandom?: boolean;
};

type FindPaginatedByCategoryResult = {
	products: Product[];
	totalCount: number;
}

export interface IProductModel extends Model<Product> {
	findPaginatedByCategory(params: FindPaginatedByCategoryParams): Promise<FindPaginatedByCategoryResult>;
}

export const ProductSchema = new mongoose.Schema<Product, IProductModel>({
	code: { type: String, index: true },
	name: String,
	altName: String,
	categoryName: String,
	gridImages: [String],
	seo: {
		title: String,
		keywords: String,
		description: String
	},
	// label: String,
	colorName: String,
	colors: [{
		name: String,
		imageUrl: String,
		productId: String
	}],
	description: {
		assetUrl: String,
		title: String,
		subtitle: String,
		text: String
	},
	specs: [String],
	price: Number,
	detailImages: [String],
	sizes: [{
		code: String,
		name: String,
		avaialability: String
	}],
	categories: { type: [mongoose.Types.ObjectId], default: [], index: true }
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

ProductSchema.statics.findPaginatedByCategory = async function({
	categoryId = '',
	start = 0,
	count = 1,
	isRandom = false
}): Promise<FindPaginatedByCategoryResult> {
	const query = {
		'categories': {
			'$in': [new mongoose.Types.ObjectId(categoryId)]
		}
	};
	const queryRestrictions = isRandom ?
		[{ $sample: { size: count } }] :
		[{ $skip: start }, { $limit: count }];

	const aggregates: PipelineStage[] = [
		{
			$facet: {
				productsResult: [
					{
						$match: query
					},
					...queryRestrictions
				],
				counter: [
					{
						$match: query
					},
					{ $count: 'totalProductsCount' }
				]
			}
		}
	];

	const [{ productsResult, counter }] = await this.aggregate(aggregates);

	// Aggregations return plain objects as the engine doesn't know about
	// the result type we're going to return in advance so I need to populate
	// the ID virtual property by hand
	return  {
		products: productsResult.map((product: { id?: string; _id: string }) => {
			product.id = product._id;
			return product;
		}),
		totalCount: counter[0].totalProductsCount
	};
};

const ProductModel: IProductModel = mongoose.models.Product as IProductModel ||
	mongoose.model<Product, IProductModel>('Product', ProductSchema);

export default ProductModel;

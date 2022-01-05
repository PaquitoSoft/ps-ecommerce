import mongoose, { Schema, Model } from 'mongoose';
import { Category } from '@ps-ecommerce/types';

export type ICategoryModel = Model<Category>

const CategorySchema = new Schema<Category, ICategoryModel>({
	code: { type: String, index: true },
	name: String,
	isHidden: Boolean,
	parent: { type: Schema.Types.ObjectId, ref: 'Category' }
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

CategorySchema.virtual('subcategories', {
	ref: 'Category',
	localField: '_id',
	foreignField: 'parent',
	sort: { createdAt: 1 }
});

const CategoryModel = mongoose.models.Category as ICategoryModel ||
	mongoose.model<Category, ICategoryModel>('Category', CategorySchema);

export default CategoryModel;

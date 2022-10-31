import mongoose, { Schema, Model, Types } from 'mongoose';
import { Wishlist } from '@ps-ecommerce/types';

export type IWishlistModel = Model<Wishlist>

// TODO: Now we should not fetch products from the database.
//	We should store products IDs in the schema and let the
//	catalog service to populate the whole products???
//	Not very sure because a wishlist is actually a list of products.
const WishlistSchema = new Schema<Wishlist, IWishlistModel>({
	userId: String,
	name: String,
	// products: [{ type: Types.ObjectId, ref: 'Product' }]
	productsIds: [{ type: Types.ObjectId, default: [] }]
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});
// WishlistSchema.pre('findOne', function() {
// 	this.populate('products');
// });
// WishlistSchema.post('save', function(doc, next) {
// 	doc.populate('products').then(function() {
// 		next();
// 	});
// });

const WishlistModel = mongoose.models.Wishlist as IWishlistModel ||
	mongoose.model<Wishlist, IWishlistModel>('Wishlist', WishlistSchema);

export default WishlistModel;

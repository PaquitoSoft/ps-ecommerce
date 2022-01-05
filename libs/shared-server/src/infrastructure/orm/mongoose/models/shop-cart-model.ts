import mongoose, { Schema, Model } from 'mongoose';
import { ShopCart } from '@ps-ecommerce/types';
import ShippingAddressSchema from './shipping-address-schema';

export type IShopCartModel = Model<ShopCart>

const ShopCartItemSchema = new Schema({
	quantity: { type: Number, default: 0 },
	product: {
		id: String,
		code: String,
		name: String,
		sizeCode: String,
		sizeName: String,
		price: Number,
		colorName: String,
		imageUrl: String
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

const ShopCartSchema = new Schema<ShopCart, IShopCartModel>({
	userId: String,
	estimatedDeliveryCost: { type: Number, default: 0 },
	items: [ShopCartItemSchema],
	shippingAddress: ShippingAddressSchema
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

ShopCartSchema.virtual('totalUnits').get(function(this: ShopCart) {
	const total = this.items.reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);
	return total;
});

ShopCartSchema.virtual('totalAmount').get(function(this: ShopCart) {
	const total = this.items.reduce((acc, item) => {
		return acc + item.product.price * item.quantity;
	}, 0).toFixed(0);
	return total;
});

const ShopCartModel = mongoose.models.ShopCart as IShopCartModel ||
	mongoose.model<ShopCart, IShopCartModel>('ShopCart', ShopCartSchema);

export default ShopCartModel;

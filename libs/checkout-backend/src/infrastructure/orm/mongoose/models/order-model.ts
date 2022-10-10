import mongoose, { Schema, Model } from 'mongoose';

import { generateId } from '@plugins/utils';
import ShippingAddressSchema from './shipping-address-schema';

import Order from '@app-types/order';

export interface IOrderModel extends Model<Order> {};

const OrderItemSchema = new Schema({
	quantity: { type: Number, default: 0 },
	product: {				
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

const PaymentDataSchema = new Schema({
	paymentMethod: String,
	paymentDetails: {
		pan: String,
		cardholder: String
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

const OrderSchema = new Schema<Order, IOrderModel>({
	userId: { type: String, index: true },
	code: { type: String, default: () => generateId().split('-')[0].toUpperCase() },
	deliveryCost: { type: Number, default: 0 },
	placedDate: { type: Number, default: Date.now },
	estimatedDeliveryDate: { type: Number, default: Date.now },
	items: [OrderItemSchema],
	shippingAddress: ShippingAddressSchema,
	paymentData: PaymentDataSchema,
	totalAmount: Number,
	totalUnits: Number
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

const OrderModel = mongoose.models.Order as IOrderModel ||
	mongoose.model<Order, IOrderModel>('Order', OrderSchema);

export default OrderModel;

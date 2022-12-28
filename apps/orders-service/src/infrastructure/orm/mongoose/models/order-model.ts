import mongoose, { Schema, Model } from 'mongoose';
import { Order } from '@ps-ecommerce/types';

export type IOrderModel = Model<Order>;

// TODO: Duplicated here from checkout-backend lib
const ShippingAddressSchema = new Schema(
	{
		email: String,
		name: String,
		surname: String,
		addressLine: String,
		postalCode: String,
		city: String,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const OrderItemSchema = new Schema(
	{
		quantity: { type: Number, default: 0 },
		product: {
			code: String,
			name: String,
			sizeCode: String,
			sizeName: String,
			price: Number,
			colorName: String,
			imageUrl: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const PaymentDataSchema = new Schema(
	{
		paymentMethod: String,
		paymentDetails: {
			pan: String,
			cardholder: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const OrderSchema = new Schema<Order, IOrderModel>(
	{
		userId: { type: String, index: true },
		code: String,
		deliveryCost: { type: Number, default: 0 },
		placedDate: { type: Number, default: Date.now },
		estimatedDeliveryDate: { type: Number, default: Date.now },
		items: [OrderItemSchema],
		shippingAddress: ShippingAddressSchema,
		paymentData: PaymentDataSchema,
		totalAmount: Number,
		totalUnits: Number,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const OrderModel =
	(mongoose.models.Order as IOrderModel) ||
	mongoose.model<Order, IOrderModel>('Order', OrderSchema);

export default OrderModel;

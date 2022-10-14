import { Schema } from 'mongoose';

const ShippingAddressSchema = new Schema({
	email: String,
	name: String,
	surname: String,
	addressLine: String,
	postalCode: String,
	city: String
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

export default ShippingAddressSchema;

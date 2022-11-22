type CustomerNewOrderItem = {
	quantity: number;
	product: {
		code: string;
		name: string;
		sizeCode: string;
		sizeName: string;
		price: number;
		colorName: string;
		imageUrl: string;
	};
}

type CustomerNewOrderShippingAddress = {
	email: string;
	name: string;
	surname: string;
	addressLine: string;
	postalCode: string;
	city: string;
};

type CustomerNewOrderPaymentData = {
	paymentMethod: string;
	paymentDetails: {
		cardholder: string;
		pan: string;
	}
};

type CustomerNewOrder = {
	userId: string;
	items: CustomerNewOrderItem[];
	shippingAddress: CustomerNewOrderShippingAddress;
	paymentData: CustomerNewOrderPaymentData;
}

export default CustomerNewOrder;

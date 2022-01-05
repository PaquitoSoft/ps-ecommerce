import PaymentData from "./payment-data";
import ShippingAddress from "./shipping-address";

export type OrderItemProduct = {
	code: string;
	name: string;
	sizeCode: string;
	sizeName: string
	price: number;
	colorName: string;
	imageUrl: string;
}

export type OrderItem = {
	id: string;
	product: OrderItemProduct;
	quantity: number;
};

type Order = {
	id: string;
	code: string;
	userId: string;
	items: OrderItem[];
	placedDate: number;
	estimatedDeliveryDate: number;
	totalUnits: number;
	deliveryCost: number;
	totalAmount: number;
	shippingAddress: ShippingAddress;
	paymentData: PaymentData;
};

export default Order;

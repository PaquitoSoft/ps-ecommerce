import ShippingAddress from "./shipping-address";

export type ShopCartProduct = {
	id: string;
	code: string;
	name: string;
	sizeCode: string;
	sizeName: string
	price: number;
	colorName: string;
	imageUrl: string;
}

export type ShopCartItem = {
	id: string;
	product: ShopCartProduct;
	quantity: number;
};

type ShopCart = {
	id: string;
	userId: string;
	items: ShopCartItem[];
	totalUnits: number;
	estimatedDeliveryCost: number;
	totalAmount: number;
	shippingAddress?: ShippingAddress;
};

export default ShopCart;

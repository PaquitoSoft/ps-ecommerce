import { DataSource } from 'apollo-datasource';
import { ShopCart } from "@ps-ecommerce/types";

import type ShopCartRepository from "../../domain/shop-cart-repo";
import ShopCartModel from "../orm/mongoose/models/shop-cart-model";

const defaultShopCart: ShopCart =  {
	id: '',
	userId: '',
	items: [],
	totalUnits: 0,
	estimatedDeliveryCost: 0,
	totalAmount: 0
};

class MongoShopCartRepository extends DataSource implements ShopCartRepository {

	async findByUser(userId: string): Promise<ShopCart> {
		const userShopCart = await ShopCartModel.findOne({ userId });
		return userShopCart || defaultShopCart;
	}

	async createUserCart(shopCart: ShopCart): Promise<ShopCart> {
		const userShopCart = new ShopCartModel(shopCart);
		return userShopCart.save();
	}

	async updateUserCart(userId: string, shopCart: ShopCart): Promise<ShopCart> {
		const userShopCart = await ShopCartModel.findOne({ userId });

		if (!userShopCart) {
			throw new Error('Shop cart not found');
		}

		userShopCart.items = shopCart.items;
		userShopCart.totalUnits = shopCart.totalUnits;
		userShopCart.shippingAddress = shopCart.shippingAddress;

		return userShopCart.save();
	}

	async removeUserCart(userId: string): Promise<void> {
		const userShopCart = await ShopCartModel.findOne({ userId });

		if (!userShopCart) {
			throw new Error('Shop cart not found');
		}

		return userShopCart.delete();
	}

	async countCartsWithProduct(productCode: string): Promise<number> {
		return ShopCartModel.find({ 'items.product.code': productCode }).count();
	}
};

export default MongoShopCartRepository;

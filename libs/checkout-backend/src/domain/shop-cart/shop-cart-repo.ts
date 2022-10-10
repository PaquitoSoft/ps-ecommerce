import ShopCart from "@app-types/shop-cart";
import Repository from "@domain/repository";

interface ShopCartRepository extends Repository {
	findByUser(userId: string): Promise<ShopCart>;
	createUserCart(shopCart: ShopCart): Promise<ShopCart>;
	updateUserCart(userId: string, shopCart: ShopCart): Promise<ShopCart>;
	removeUserCart(userId: string): Promise<void>;
};

export default ShopCartRepository;

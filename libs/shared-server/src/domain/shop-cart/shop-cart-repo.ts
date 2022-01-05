import { ShopCart } from "@ps-ecommerce/types";
import Repository from '../repository';

interface ShopCartRepository extends Repository {
	findByUser(userId: string): Promise<ShopCart>;
	createUserCart(shopCart: ShopCart): Promise<ShopCart>;
	updateUserCart(userId: string, shopCart: ShopCart): Promise<ShopCart>;
	removeUserCart(userId: string): Promise<void>;
};

export default ShopCartRepository;

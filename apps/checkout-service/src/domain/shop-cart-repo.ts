import { ShopCart } from "@ps-ecommerce/types";
import { Repository } from '@ps-ecommerce/shared-server';

interface ShopCartRepository extends Repository {
	findByUser(userId: string): Promise<ShopCart>;
	createUserCart(shopCart: ShopCart): Promise<ShopCart>;
	updateUserCart(userId: string, shopCart: ShopCart): Promise<ShopCart>;
	removeUserCart(userId: string): Promise<void>;
	countCartsWithProduct(productCode: string): Promise<number>;
};

export default ShopCartRepository;

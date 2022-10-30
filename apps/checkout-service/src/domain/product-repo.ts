import { Product } from "@ps-ecommerce/types";
import { Repository } from '@ps-ecommerce/shared-server';

interface ProductRepository extends Repository {
	findByProductCode(productCode: string): Promise<Product>;
};

export default ProductRepository;

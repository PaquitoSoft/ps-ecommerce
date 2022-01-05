import { Product } from "@ps-ecommerce/types";
import Repository from '../repository';

export type FindProductsByCategoryCodeParams = {
	categoryCode: string;
	start?: number;
	count: number;
	randomValues?: boolean;
};

export type FindPaginatedByCategoryCodeResult = {
	products: Product[];
	totalCount: number;
}

interface ProductRepository extends Repository {
	findByProductCode(productCode: string): Promise<Product>;
	findByCategoryCode({
		categoryCode,
		start,
		count,
		randomValues
	}: FindProductsByCategoryCodeParams): Promise<FindPaginatedByCategoryCodeResult>
};

export default ProductRepository;

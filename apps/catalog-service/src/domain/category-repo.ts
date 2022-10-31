import type { Category } from '@ps-ecommerce/types';
import type { Repository } from '@ps-ecommerce/shared-server';

interface CategoryRepository extends Repository {
	getTree(): Promise<Category[]>;
	findByCode(categoryCode: string): Promise<Category>;
};

export default CategoryRepository;

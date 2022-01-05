import { Category } from '@ps-ecommerce/types';
import Repository from '../repository';

interface CategoryRepository extends Repository {
	getTree(): Promise<Category[]>;
	findByCode(categoryCode: string): Promise<Category>;
};

export default CategoryRepository;

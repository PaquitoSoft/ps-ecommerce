import type { ApolloContext as GenericContext } from '@ps-ecommerce/shared-server';
import type ProductRepository from '../../../domain/product-repo';
import type CategoryRepository from '../../../domain/category-repo';

type ApolloContext = GenericContext & {
	dataSources: {
		product: ProductRepository,
		category: CategoryRepository
	}
};

export default ApolloContext;

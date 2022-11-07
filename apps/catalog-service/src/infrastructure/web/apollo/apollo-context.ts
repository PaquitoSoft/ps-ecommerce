import type { ApolloContext as GenericContext } from '@ps-ecommerce/shared-server';
import type ProductRepository from '../../../domain/product-repo';
import type CategoryRepository from '../../../domain/category-repo';
import FooterLinkRepository from '../../../domain/footer-link-repo';

type ApolloContext = GenericContext & {
	dataSources: {
		product: ProductRepository,
		category: CategoryRepository,
		footerLink: FooterLinkRepository
	}
};

export default ApolloContext;

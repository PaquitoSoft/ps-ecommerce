import type { ApolloContext as GenericContext } from '@ps-ecommerce/shared-server';
import type ProductRepository from '../../../domain/product-repo';
import type ShopCartRepository from '../../../domain/shop-cart-repo';
import type GraphqlOrderRepository from '../../repositories/graphql-order-repository';

type ApolloContext = GenericContext & {
	dataSources: {
		shopCart: ShopCartRepository,
		product: ProductRepository,
		order: GraphqlOrderRepository
	}
};

export default ApolloContext;

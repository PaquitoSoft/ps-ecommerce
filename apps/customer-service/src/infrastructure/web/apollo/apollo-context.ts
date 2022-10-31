import type { ApolloContext as GenericContext } from '@ps-ecommerce/shared-server';
import type OrderRepository from '../../../domain/order-repo';
import type WishlistRepository from '../../../domain/wishlist-repo';

type ApolloContext = GenericContext & {
	dataSources: {
		order: OrderRepository,
		wishlist: WishlistRepository
	}
};

export default ApolloContext;

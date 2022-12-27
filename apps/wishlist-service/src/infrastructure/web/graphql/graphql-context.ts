import type { ApolloContext } from '@ps-ecommerce/shared-server';
import type WishlistRepository from '../../../domain/wishlist-repo';

type GraphqlContext = ApolloContext & {
	dataSources: {
		wishlist: WishlistRepository
	}
};

export default GraphqlContext;

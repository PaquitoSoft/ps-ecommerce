import type { ApolloContext as GenericContext } from '@ps-ecommerce/shared-server';
import type OrderRepository from '../../../domain/order-repo';

type ApolloContext = GenericContext & {
	dataSources: {
		order: OrderRepository
	}
};

export default ApolloContext;

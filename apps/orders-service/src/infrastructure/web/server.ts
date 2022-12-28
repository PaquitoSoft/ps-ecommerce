import { webServer } from '@ps-ecommerce/shared-server';

import * as OrderType from './apollo/types/order-gql-type';
import * as PaymentDataType from './apollo/types/payment-data-gql-type';
import * as ShippingAddressType from './apollo/types/shipping-address-gql-type';

import MongoOrderRepository from '../repositories/mongo-order-repo';

type TStartServerParams = {
	port: number;
};

export function startServer({ port }: TStartServerParams) {
	return webServer.startServer({
		serviceName: 'orders',
		port,
		typesConfiguration: [OrderType, PaymentDataType, ShippingAddressType],
		dataSources: () => {
			return {
				order: new MongoOrderRepository(),
			};
		},
	});
}

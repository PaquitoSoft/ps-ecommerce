import { webServer } from '@ps-ecommerce/shared-server';

import * as ShopCartType from './apollo/types/shop-cart-gql-type';
import * as ShippingAddressType from './apollo/types/shipping-address-gql-type';
// import { typeDef as ProductTypeDefinitions } from './apollo/types/product-gql-type';
import * as OrderType from './apollo/types/order-gql-type';

import MongoShopCartRepository from '../repositories/mongo-shop-cart-repo';
import GraphqlProductRepository from '../repositories/graphql-product-repo';
import GraphqlOrderRepository from '../repositories/graphql-order-repository';

type TStartServerParams = {
	port: number;
	externalServicesConfig: {
		catalogServiceUrl: string;
		customerServiceUrl: string;
	}
};

export function startServer({
	port,
	externalServicesConfig
}: TStartServerParams) {
	return webServer.startServer({
		serviceName: 'checkout',
		port,
		typesConfiguration: [
			ShopCartType,
			ShippingAddressType,
			OrderType,
		],
		dataSources: () => {
			return {
				shopCart: new MongoShopCartRepository(),
				product: new GraphqlProductRepository(externalServicesConfig.catalogServiceUrl),
				order: new GraphqlOrderRepository(externalServicesConfig.customerServiceUrl)
			};
		},
	});
};

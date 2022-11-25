import { webServer } from '@ps-ecommerce/shared-server';

import * as ProductType from './apollo/types/product-gql-type';
import * as CategoryType from './apollo/types/category-gql-type';
import * as FooterLinkType from './apollo/types/footer-link-gql-type';

import MongoProductRepository from '../repositories/mongo-product-repo';
import MongoCategoryRepository from '../repositories/mongo-category-repo';
import MongoFooterLinkRepository from '../repositories/mongo-footer-link-repo';

type TStartServerParams = {
	port: number;
};

export function startServer({
	port
}: TStartServerParams) {
	return webServer.startServer({
		serviceName: 'catalog',
		port,
		typesConfiguration: [
			ProductType,
			CategoryType,
			FooterLinkType
		],
		dataSources: () => {
			return {
				product: new MongoProductRepository(),
				category: new MongoCategoryRepository(),
				footerLink: new MongoFooterLinkRepository()
			};
		},
	});
};

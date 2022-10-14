import merge from 'lodash.merge';
import { RepositoryFactory } from '@ps-ecommerce/shared-server';

import * as CategoryType from './lib/infrastructure/web/apollo/types/category-gql-type';
import * as ProductType from './lib/infrastructure/web/apollo/types/product-gql-type';

import MongoCategoryRepository from './lib/infrastructure/repositories/category/mongo-category-repo';
import MongoProductRepository from './lib/infrastructure/repositories/product/mongo-product-repo';

export type { default as ProductRepository } from './lib/domain/product/product-repo';

export const graphqlSchemaExtensions = {
	typeDefs: [CategoryType.typeDef, ProductType.typeDef],
	resolvers: merge(CategoryType.resolvers, ProductType.resolvers)
};

export const repositoryTypes = Object.freeze({
	Category: 'category-repo',
	Product: 'product-repo'
});

export const repositoryFactory = new RepositoryFactory({
	[repositoryTypes.Category]: MongoCategoryRepository,
	[repositoryTypes.Product]: MongoProductRepository
});

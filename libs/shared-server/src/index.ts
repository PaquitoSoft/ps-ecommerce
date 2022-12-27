import MongoFooterLinkRepository from './infrastructure/repositories/footer-link/mongo-footer-link-repo';
import RepositoryFactory from './infrastructure/repositories/repository-factory';

export type { default as Repository } from './domain/repository';
export { default as RepositoryFactory} from './infrastructure/repositories/repository-factory';

export { createSchema as createApolloGraphqlSchema } from './infrastructure/web/apollo/schema';
export { createApolloClient } from './infrastructure/web/apollo/apollo-server-client';
export type { default as ApolloContext } from './infrastructure/web/apollo/apollo-context.type';

import * as bigintType from './infrastructure/web/apollo/types/bigint-gql-type';
import * as footerLinkType from './infrastructure/web/apollo/types/footer-link-gql-type';

export const repositoryTypes = Object.freeze({
	FooterLink: 'footer-link-repo'
});

export const repositoryFactory = new RepositoryFactory({
	[repositoryTypes.FooterLink]: MongoFooterLinkRepository
});

export const sharedGraphqlTypes = {
	bigintType,
	footerLinkType
};

export * as webUtils from './infrastructure/web/utils';
export * as webServer from './infrastructure/web/server';

export { connect as connectToMongo } from './infrastructure/orm/mongoose/mongoose-connection';

export { extractUserId as extractUserIdFromRequest } from './infrastructure/web/utils';

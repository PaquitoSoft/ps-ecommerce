import MongoFooterLinkRepository from './infrastructure/repositories/footer-link/mongo-footer-link-repo';
import RepositoryFactory from './infrastructure/repositories/repository-factory';

export type { default as Repository } from './domain/repository';
export { default as RepositoryFactory} from './infrastructure/repositories/repository-factory';

export { createSchema as createApolloGraphqlSchema } from './infrastructure/web/apollo/schema';
export { createApolloClient } from './infrastructure/web/apollo/apollo-server-client';
export type { default as ApolloContext } from './infrastructure/web/apollo/apollo-context.type';

export const repositoryTypes = Object.freeze({
	FooterLink: 'footer-link-repo'
});

export const repositoryFactory = new RepositoryFactory({
	[repositoryTypes.FooterLink]: MongoFooterLinkRepository
});

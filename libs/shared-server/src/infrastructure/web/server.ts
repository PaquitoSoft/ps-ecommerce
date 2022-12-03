import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer/*, gql*/ } from'apollo-server';
import { DocumentNode } from 'graphql';
import merge from 'lodash.merge';

import Repository from '../../domain/repository';
import * as bigintType from './apollo/types/bigint-gql-type';
import { extractUserId } from './utils';

type TypeConfiguration = {
	typeDef: DocumentNode;
	resolvers?: Record<string, unknown>;
}

type TStartServerParams = {
	serviceName: string;
	port: number;
	typesConfiguration: TypeConfiguration[];
	dataSources: () => Record<string, Repository>;
};

const authPlugin = {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async serverWillStart() {},
	willSendResponse(
		requestContext: unknown
	) {
		console.log({ requestContext });
		return Promise.resolve(true);
	}
};

const loggerPlugin = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async requestDidStart(requestContext: any) {
	  console.log('Request started! Query:\n' + requestContext.request.query);
	  console.log('Request started! Operation Name:\n' + requestContext.request.operationName);
	  console.log('Request started! Variables:\n' + JSON.stringify(requestContext.request.variables, null, 2));

	  return {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		async parsingDidStart() {},

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		async validationDidStart() {},
	  };
	},
  };

export async function startServer({
	serviceName,
	port,
	typesConfiguration,
	dataSources
}: TStartServerParams) {
	const server = new ApolloServer({
		cors: true,
		introspection: true,
		plugins: [
			// loggerPlugin,
			authPlugin
		],
		schema: buildSubgraphSchema({
			typeDefs: [
				...typesConfiguration.map(config => config.typeDef),
				bigintType.typeDef
			],
			resolvers: merge.apply(null, [
				{},
				...typesConfiguration.map(config => config.resolvers).filter(Boolean),
				bigintType.resolvers
			])
		}),
		context: async ({ req, }) => ({
			userId: extractUserId(req)
		}),
		dataSources,
	});

	try {
		const { url } = await server.listen({ port });
		console.log(`🚀 Subgraph '${serviceName}' running at ${url}`);
		return server;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

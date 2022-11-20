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
	async serverWillStart() {
		console.log('----> Server starting up!');
	},
	willSendResponse(
		requestContext: unknown
	) {
		console.log({ requestContext });
		return Promise.resolve(true);
	}
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

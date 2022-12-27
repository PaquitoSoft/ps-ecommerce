import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { buildSubgraphSchema } from '@apollo/subgraph';
import MongoWishlistRepository from '../repositories/mongo-wishlist-repo';
import GraphqlContext from './graphql/graphql-context';
import { extractUserIdFromRequest } from '@ps-ecommerce/shared-server';
import * as WishlistType from './graphql/types/wishlist-gql-type';

type TStartServerParams = {
	port: number;
};

const createContext = (request: Request): GraphqlContext => ({
  userId: extractUserIdFromRequest(request),
  dataSources: {
    wishlist: new MongoWishlistRepository()
  }
});

export function startServer({ port }: TStartServerParams) {
  const schema = buildSubgraphSchema({
    typeDefs: [WishlistType.typeDef],
    resolvers: WishlistType.resolvers
  });

  const yoga = createYoga({
    cors: true,
    schema,
    graphqlEndpoint: '/',
    context: ({ request }) => createContext(request)
  });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.log(`🚀 Subgraph 'wishlist' running at http://localhost:${port}/`);
  });

  return server;
}

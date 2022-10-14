import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { NextApiRequest } from 'next';
import { IncomingMessage, ServerResponse } from 'http';

import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { graphqlSchemaExtensions as customerSchema } from '@ps-ecommerce/customer-backend';
import { graphqlSchemaExtensions as checkoutSchema } from '@ps-ecommerce/checkout-backend';
import { createApolloGraphqlSchema } from '@ps-ecommerce/shared-server';

const cors = Cors();

const apolloServer = new ApolloServer({
	schema: createApolloGraphqlSchema([
		catalogSchema,
		customerSchema,
		checkoutSchema
	]),
	context: ({ req }: { req: NextApiRequest }) => {
		return {
			userId: req.query.userId || req.cookies.uid
		};
	}
});
const startServer = apolloServer.start();

export const config = {
	api: {
		bodyParser: false
	}
};

export default cors(async function(req: IncomingMessage, res: ServerResponse) {
	if (req.method === 'OPTIONS') {
		res.end();
		return false;
	}
	await startServer;
	await apolloServer.createHandler({
		path: '/api/graphql'
	})(req, res);
});

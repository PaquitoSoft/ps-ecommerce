import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';

import { IncomingMessage, ServerResponse } from 'http';
import { apolloGraphqlSchema } from '@ps-ecommerce/shared-server';
import { NextApiRequest } from 'next';

const cors = Cors();

const apolloServer = new ApolloServer({
	schema: apolloGraphqlSchema,
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

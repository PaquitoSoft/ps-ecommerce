import { connectToMongo } from "@ps-ecommerce/shared-server";
import { startServer } from "./infrastructure/web/server";

const SERVER_PORT = +process.env.PORT || 4003;
const DATABASE_URL = process.env.DATABASE_URL || '';

async function start() {
	// 1. Connect to Mongo
	await connectToMongo({ databaseUrl: DATABASE_URL });

	// 2. Start GraphQL server
	await startServer({
		port: SERVER_PORT
	});
}

start();


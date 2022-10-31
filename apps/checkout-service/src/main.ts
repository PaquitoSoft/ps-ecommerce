import { connectToMongo } from "@ps-ecommerce/shared-server";
import { startServer } from "./infrastructure/web/server";

const SERVER_PORT = +process.env.PORT || 4002;
const DATABASE_URL = process.env.DATABASE_URL || '';
const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL || '';
const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || '';

async function start() {
	// 1. Connect to Mongo
	await connectToMongo({ databaseUrl: DATABASE_URL });

	// 2. Start GraphQL server
	await startServer({
		port: SERVER_PORT,
		externalServicesConfig: {
			catalogServiceUrl: CATALOG_SERVICE_URL,
			customerServiceUrl: CUSTOMER_SERVICE_URL
		}
	});
}

start();

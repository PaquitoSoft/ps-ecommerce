/* eslint-disable no-var */
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
import mongoose, { Connection } from 'mongoose';

declare global {
	var _efe_mongooseConnection: Connection;
	var _efe_mongoosePromise: Promise<Connection>;
}

// mongoose.set('debug', true);

global._efe_mongooseConnection;
global._efe_mongoosePromise;

export function connectToMongo(): Promise<Connection> {
	if (global._efe_mongooseConnection) {
		return Promise.resolve(global._efe_mongooseConnection);
	}

	if (global._efe_mongoosePromise) {
		return global._efe_mongoosePromise;
	}

	console.log('MongooseConnection::connectToMongo# CONNECTING to DB...');
	// eslint-disable-next-line no-async-promise-executor
	global._efe_mongoosePromise = new Promise(async (resolve) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const _mongoose = await mongoose.connect(process.env.DATABASE_URL!, {
			autoIndex: process.env.NODE_ENV !== 'production'
		});
		console.log('MongooseConnection::connectToMongo# CONNECTED to DB!');
		_mongoose.connection.on('error', error => {
			console.error('Error in Mongo connection:', error);
		});
		global._efe_mongooseConnection = _mongoose.connection;
		resolve(_mongoose.connection);
	});

	return global._efe_mongoosePromise;
}

export async function connect({ databaseUrl }: { databaseUrl: string }) {
	console.log('MongooseConnection::connectToMongo# CONNECTING to DB...');

	const _mongoose = await mongoose.connect(databaseUrl, {
		autoIndex: process.env.NODE_ENV !== 'production'
	});
	console.log('MongooseConnection::connectToMongo# CONNECTED to DB!');

	_mongoose.connection.on('error', error => {
		console.error('Error in Mongo connection:', error);
	});

	return _mongoose.connection;
}

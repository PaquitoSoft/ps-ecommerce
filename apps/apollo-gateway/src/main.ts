import { join } from "path";
import { readFileSync } from "fs";
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from "apollo-server";

const supergraphSdl = readFileSync(join(__dirname, './schemas/supergraph-schema.graphql')).toString();

const gateway = new ApolloGateway({
  supergraphSdl
});

const server = new ApolloServer({ gateway });

server.listen().then(serverInfo => console.log(`Apollo Gateway up and running in port ${serverInfo.port}...`));

# Apollo Router

## Running locally

Follow these steps to run the Apollo Router locally:
1. Install the binary
  ```curl -sSL https://rover.apollo.dev/nix/latest | sh```
2. Build a local supergraph schema (your backend services must not be locally running)
  ```./scripts/subgraphs build```
3. Start all backend services (from the project's root directory)
  ```npm run dev:backend```
4. Start the router (from this directory)
  ```./router --config config.yaml --supergraph ./schemas/supergraph-schema.graphql```


## Publish subgraphs changes to Apollo Registry

After changing anything in a service GraphQL schema, you need to:
1. Deploy the service with the changes (from the project's root directory)
  ```npx nx deploy <service-name>-service```
2. Once the changes are public, publish the new schema to the Apollo registry (from this directory)
  ```./scripts/fede publish --service <service-name>```

## Useful commands

### Run the router in managed mode
```
APOLLO_KEY=<YOUR_GRAPH_API_KEY> APOLLO_GRAPH_REF=<YOUR_GRAPH_ID>@<VARIANT> ./router --config ./config.yaml
```

### Get local service GraphQL schema
```
rover subgraph introspect <service-endpoint>
```

### Publish subgraph schema (instrospection)
```
rover subgraph introspect \
  <service-endpoint> | \
  APOLLO_KEY=<YOUR_GRAPH_API_KEY> \
  rover subgraph publish <YOUR_GRAPH_ID>@<VARIANT> \
  --name <service-name> \
  --schema - \
  --routing-url <service-endpoint>
```

### Build backend service docker image
```
docker build -f ./apps/<service-name>-service/Dockerfile . -t paquitosoft/ecommerce_<service-name>-service
```

### Publish backend service docker image
(_you need to be authenticated in the docker CLI_)
```
docker push paquitosoft/ecommerce_<service-name>-service:latest
```

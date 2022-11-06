# Local Apollo Router

Follow these steps to run the Apollo Router locally:
1. Install the binary
  ```curl -sSL https://rover.apollo.dev/nix/latest | sh```
2. Build a local supergraph schema (your backend services must not be locally running)
  ```./scripts/subgraphs build```
3. Start all backend services (from the project's root directory)
  ```npm run dev:backend```
4. Start the router (from this directory)
  ```./router --config config.yaml --supergraph ./schemas/supergraph-schema.graphql```

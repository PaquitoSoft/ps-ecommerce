import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { useMemo } from 'react';

const isBroswerEnvironment = typeof window === 'object';

type TCache = Record<string, unknown>;
type TApolloInitializationParams = {
  endpointUrl: string;
  initialState?: Record<string, unknown>
};

let apolloClient: ApolloClient<TCache> | undefined;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const createClient = ({ endpointUrl }: { endpointUrl: string }) =>
  new ApolloClient({
    link: from([
      errorLink,
      new HttpLink({
        uri: endpointUrl,
        credentials: 'same-origin'
      })
    ]),
    cache: new InMemoryCache(),
    ssrMode: !isBroswerEnvironment
  });

export function getApolloClient({ endpointUrl, initialState }: TApolloInitializationParams) {
  // TODO: Review this reference -> https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
  const _apolloClient = apolloClient || createClient({ endpointUrl });

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // Server side we need a different client for every request
  if (!isBroswerEnvironment) {
    return _apolloClient;
  }

  // Client side we can reuse the same client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export default function useApollo({
  endpointUrl,
  initialState
}: TApolloInitializationParams) {
	const store = useMemo(() => getApolloClient({ endpointUrl, initialState }), [initialState]);
	return store;
}

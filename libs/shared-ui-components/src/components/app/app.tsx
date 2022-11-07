import { ReactChild, ReactElement } from 'react';
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app'

import useApolloClient from '../../hooks/use-apollo-client';

import BaseLayout from '../layouts/base-layout/base-layout';

type PageProps = {
	initialApolloState?: Record<string, unknown>
};

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement, pageProps: unknown) => ReactChild
}

type AppPropsWithLayout = AppProps<PageProps> & {
	Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
	const { initialApolloState, ...componentProps } = pageProps;
	const apolloClient = useApolloClient({
		endpointUrl: process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL as string,
		initialState: initialApolloState
	});
	const child = Component.getLayout ?
		Component.getLayout(<Component {...componentProps} />, componentProps) :
		(
			<BaseLayout>
				<Component {...componentProps} />
			</BaseLayout>
		);

	return (
		<ApolloProvider client={apolloClient}>
			{child}
		</ApolloProvider>
	);
}

export default App;

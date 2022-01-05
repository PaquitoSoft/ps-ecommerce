import { ReactChild, ReactElement } from 'react';
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app'

import useApolloClient from '../../hooks/use-apollo-client';

import BaseLayout from '../layouts/base-layout/base-layout';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement, pageProps: unknown) => ReactChild
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
	const apolloClient = useApolloClient(pageProps.initialApolloState);
	const child = Component.getLayout ?
		Component.getLayout(<Component {...pageProps} />, pageProps) :
		(
			<BaseLayout>
				<Component {...pageProps} />
			</BaseLayout>
		);

	return (
		<ApolloProvider client={apolloClient}>
			{child}
		</ApolloProvider>
	);
}

export default App;

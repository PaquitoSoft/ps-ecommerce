import { ReactChild, ReactElement } from 'react';
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app'

import { useApolloClient } from '@ps-ecommerce/shared-ui-components';

import { BaseLayout } from '@ps-ecommerce/shared-ui-components';

// import '../components/layouts/styles/reset.css';
// import '../components/layouts/styles/variables.css';
// import '../components/layouts/styles/fonts.css';
// import '../components/layouts/styles/app-globals.css';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement, pageProps: unknown) => ReactChild
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function EcommerceApp({ Component, pageProps }: AppPropsWithLayout) {
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

export default EcommerceApp;

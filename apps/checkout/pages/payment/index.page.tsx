import { ReactElement } from "react";
import { GetServerSideProps } from "next";

import { createApolloClient, webUtils } from "@ps-ecommerce/shared-server";

import { Breadcrumb, ShopCart } from "@ps-ecommerce/types";

import { SectionTitle } from "@ps-ecommerce/design-system";
import { ShopLayout } from "@ps-ecommerce/shared-ui-components";
import PaymentSelectionForm from "./payment-selection-form/payment-selection-form";

import { ShopCartQuery } from "@ps-ecommerce/shared-ui-components";
import usePayment from "./use-payment";

import styles from './payment.module.css';

function PaymentPage() {
	const { actions: { onFormSubmit } } = usePayment();
	return (
		<div>
			<SectionTitle as="h1">Payment selection</SectionTitle>
			<p className={styles.paymentPageSubtitle}>All transactions are safe and secure</p>
			<hr className={styles.paymentPageSeparator} />
			<PaymentSelectionForm onSubmit={onFormSubmit} />
		</div>
	);
}


export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = webUtils.extractUserId(context.req, context.query);

	const apolloClient = createApolloClient({
		endpointUrl: process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL,
		context: { userId },
	});

	const queryResult = await apolloClient.query({
		query: ShopCartQuery
	});

	return {
		props: {
			shopCart: queryResult.data.shopCart
		}
	};
}

PaymentPage.getLayout = function getLayout(page: ReactElement, pageProps: { shopCart: ShopCart }) {
	return (
		<ShopLayout shopCart={pageProps.shopCart} selectedBreadcrumb={Breadcrumb.PAYMENT}>
			{page}
		</ShopLayout>
	);
}

export default PaymentPage;

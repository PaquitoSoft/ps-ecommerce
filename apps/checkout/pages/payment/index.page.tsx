import { ReactElement } from "react";
import { GetServerSideProps } from "next";

import { graphqlSchemaExtensions as checkoutSchema } from '@ps-ecommerce/checkout-backend';
import { graphqlSchemaExtensions as customerSchema } from '@ps-ecommerce/customer-backend';
import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { createApolloClient } from "@ps-ecommerce/shared-server";

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
	const userId = context.query.userId as string;

	const apolloClient = createApolloClient({
		context: { userId },
		schemaExtensions: [checkoutSchema, customerSchema, catalogSchema]
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

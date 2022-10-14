import { ReactElement } from "react";
import { GetServerSideProps } from "next";

import { graphqlSchemaExtensions as checkoutSchema } from '@ps-ecommerce/checkout-backend';
import { graphqlSchemaExtensions as customerSchema } from '@ps-ecommerce/customer-backend';
import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { createApolloClient } from "@ps-ecommerce/shared-server";

import { Breadcrumb, ShopCart } from "@ps-ecommerce/types";

import { SectionTitle, utilStyles } from "@ps-ecommerce/design-system";
import { ShopLayout } from "@ps-ecommerce/shared-ui-components";
import DeliveryAddressForm from "./delivery-address-form/delivery-address-form";

import { ShopCartQuery } from "@ps-ecommerce/shared-ui-components";
import useDelivery from "./use-delivery";


type Props = {
	shopCart: ShopCart;
};

function DeliveryPage({ shopCart }: Props) {
	const { actions: { onFormSubmit } } = useDelivery();

	return (
		<div>
			<SectionTitle as="h1">Delivery Address</SectionTitle>
			<section className={utilStyles.marginTop_40}>
				<DeliveryAddressForm
					shippingAddress={shopCart.shippingAddress}
					onSubmit={onFormSubmit}
				/>
			</section>
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

DeliveryPage.getLayout = function getLayout(page: ReactElement, pageProps: Props) {
	return (
		<ShopLayout shopCart={pageProps.shopCart} selectedBreadcrumb={Breadcrumb.DELIVERY}>
			{page}
		</ShopLayout>
	);
}

export default DeliveryPage;

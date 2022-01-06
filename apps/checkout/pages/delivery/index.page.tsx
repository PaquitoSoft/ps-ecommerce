import { ReactElement } from "react";
import { GetServerSideProps } from "next";

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

	const apolloClient = createApolloClient({ userId });
	const queryResult = await apolloClient.query({
		query: ShopCartQuery
	});

	return {
		props: {
			shopCart: queryResult.data.shopCart
		}
	};
}

DeliveryPage.getLayout = function getLayout(page: ReactElement, pageProps: any) {
	return (
		<ShopLayout shopCart={pageProps.shopCart} selectedBreadcrumb={Breadcrumb.DELIVERY}>
			{page}
		</ShopLayout>
	);
}

export default DeliveryPage;

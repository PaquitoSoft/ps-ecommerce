import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';

import { createApolloClient } from '@ps-ecommerce/shared-server';

import { Breadcrumb, Order } from '@ps-ecommerce/types';

import { ShopLayout, HelpLinksList } from '@ps-ecommerce/shared-ui-components';

import {
	SectionTitle,
	MessageBanner,
	WarehouseIcon,
	ShippingIcon,
	CheckmarkIcon,
	utilStyles
} from '@ps-ecommerce/design-system';

import styles from './confirmation.module.css';

type Props = {
	order: Order;
};

const OrderConfirmationQuery = gql`
	query OrderConfirmationQuery {
		userLastOrder {
			code
			shippingAddress {
				email
			}
		}
	}
`;

function NextStep({ icon, title, children }: { icon: ReactElement, title: string, children: ReactElement | string }) {
	return (
		<li className={styles.confirmationPageNextStep}>
			<div className={styles.confirmationPageNextStepIcon}>
				{icon}
			</div>
			<div>
			<h3 className={styles.confirmationPageNextStepTitle}>{title}</h3>
				<p>{children}</p>
			</div>
		</li>
	);
}

function ConfirmationPage({ order }: Props) {
	return (
		<section className={styles.confirmationPage}>
			<div className={styles.confirmationPageInfo}>
				<div className={styles.confirmationPageBlock}>
					<SectionTitle as="h1" className={utilStyles.marginBottom_20}>We&apos;ve received your order</SectionTitle>
					<MessageBanner className={styles.confirmationPageSuccessBanner}>
						Your order is being processed
					</MessageBanner>
					<p className={utilStyles.marginTop_15}>Order number: <span data-test-id="order-code">{order.code}</span></p>
					<p className={utilStyles.marginTop_15}>
						<span>Thanks for buying with us!&nbsp;</span>
						<span>We will send you a confirmation email shortly to: <span className={styles.confirmationPageUserEmail}>{order.shippingAddress.email}</span></span>
					</p>
				</div>
				<div className={utilStyles.marginTop_40}>
					<SectionTitle className={utilStyles.marginBottom_20}>NEXT STEPS</SectionTitle>
					<ol className={styles.confirmationPageNextStepsList}>
						<NextStep icon={<WarehouseIcon />} title="Preparation">
							Your items will be collected and sent from our warehouse.
						</NextStep>
						<NextStep icon={<ShippingIcon />} title="Shipping">
							We will ship your order and you will receieve and email with a tracking link.
						</NextStep>
						<NextStep icon={<CheckmarkIcon />} title="Delivery">
							You will receive your order in the address you provided to us.
						</NextStep>
					</ol>
					<p>
						<span>Any further questions?&nbsp;</span>
						<span>Find the answers in our <a className={styles.confirmationPageHelpPageLink} href="#">help page</a>.</span>
					</p>
				</div>
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = context.query.userId as string;

	const apolloClient = createApolloClient({ userId });
	const queryResult = await apolloClient.query({
		query: OrderConfirmationQuery
	});

	return {
		props: {
			order: queryResult.data.userLastOrder
		}
	};
}

ConfirmationPage.getLayout = function getLayout(page: ReactElement, pageProps: any) {
	const sidebarContent = (
		<HelpLinksList
			title="Do you need help?"
			titleSize='tiny'
			links={[
				{ href: '#', text: 'When will arrive my order?' },
				{ href: '#', text: 'Can I return my order?' },
				{ href: '#', text: 'Do I need an account to place an order?' },
				{ href: '#', text: 'How can I use my discount?' }
			]}
		/>
	);

	return (
		<ShopLayout
			shopCart={pageProps.shopCart}
			selectedBreadcrumb={Breadcrumb.CONFIRMATION}
			sidebarContent={sidebarContent}
		>
			{page}
		</ShopLayout>
	);
}

export default ConfirmationPage;

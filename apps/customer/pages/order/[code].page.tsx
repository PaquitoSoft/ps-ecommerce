import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';

import { createApolloClient } from '@ps-ecommerce/shared-server';

import { Order } from '@ps-ecommerce/types';

import { FormattedDate, SectionTitle, TwoLayoutMainContent } from '@ps-ecommerce/design-system';
import { HelpLinksList } from '@ps-ecommerce/shared-ui-components';

import OrderDetailsDetailsSection from './order-details-details-section/order-details-details-section';
import OrderDetailsShippingSection from './order-details-shipping-section/order-details-shipping-section';
import OrderDetailsTotalsSection from './order-details-totals-section/order-details-totals-section';
import OrderDetailsItemListRow from './order-details-item-list-row/order-details-item-list-row';

import styles from './order-details.module.css';

type Props = {
	order: Order;
};

const OrderDetailQuery = gql`
	query OrderDetailQuery($orderCode: String!) {
		order(orderCode: $orderCode) {
			id
			code
			items {
				id
				quantity
				product {
					code
					name
					sizeCode
					sizeName
					price
					colorName
					imageUrl
				}
			}
			placedDate
			estimatedDeliveryDate
			totalUnits
			deliveryCost
			totalAmount
			shippingAddress {
				email
				name
				surname
				addressLine
				postalCode
				city
			}
			paymentData {
				paymentDetails {
					pan
					cardholder
				}
			}
		}
	}
`;

function OrderDetailPage({ order }: Props) {
	return (
		<TwoLayoutMainContent className={styles.orderDetailsPage}>
			<section className={styles.orderDetailsContentSection}>
				<SectionTitle as="h1">Order details</SectionTitle>

				<div className={styles.orderDetailsDelivery}>
					<p>Estimated delivery: <FormattedDate timestamp={order.estimatedDeliveryDate} /></p>
					<p>You will be able to track your order once we ship it from our warehouse.</p>
				</div>

				<ul className={styles.orderDetailsItemsList}>
					{order.items.map((item) => (
						<OrderDetailsItemListRow key={item.id} orderItem={item} />
					))}
				</ul>

				<OrderDetailsDetailsSection order={order} />

				<OrderDetailsShippingSection order={order} />

				<OrderDetailsTotalsSection
					className={styles.orderDetailsTotals}
					order={order}
				/>
			</section>
			<section className={styles.orderDetailsHelpSection}>
				<HelpLinksList
					title="Need help?"
					titleSize="small"
					links={[
						{ href: '#', text: 'Products' },
						{ href: '#', text: 'Ordering & Payments' },
						{ href: '#', text: 'Delivery' },
						{ href: '#', text: 'Promotions & Vouchers' },
						{ href: '#', text: 'Returns & refunds' },
						{ href: '#', text: 'Accounts & Newsletter' },
						{ href: '#', text: 'Company information' }
					]}
				/>
			</section>
		</TwoLayoutMainContent>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = context.query.userId as string;
	const orderCode = context.params!.code as string;

	const apolloClient = createApolloClient({ userId });
	const apolloQueryData = await apolloClient.query({
		query: OrderDetailQuery,
		variables: { orderCode }
	});

	return {
		props: {
			order: apolloQueryData.data.order
		}
	};
}

export default OrderDetailPage;

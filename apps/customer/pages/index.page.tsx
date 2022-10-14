import Link from "next/link";
import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";

import { graphqlSchemaExtensions as customerSchema } from '@ps-ecommerce/customer-backend';
import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { graphqlSchemaExtensions as checkoutSchema } from '@ps-ecommerce/checkout-backend';
import { createApolloClient } from "@ps-ecommerce/shared-server";

import { Order } from "@ps-ecommerce/types";

import { SectionTitle, FormattedDate } from "@ps-ecommerce/design-system";
import { ProductImage } from "@ps-ecommerce/shared-ui-components";

import styles from './profile.module.css';

type Props = {
	orders: Order[];
};

const OrdersListQuery = gql`
	query OrdersListQuery {
		userOrders {
			id
			code
			placedDate
			totalUnits
			totalAmount
			items {
				product {
					name
					imageUrl
				}
			}
		}
	}
`;

function OrderListItem({ order }: { order: Order }) {
	return (
		<li>
			<Link href={`/order/${order.code}`}>
				<a className={styles.profilePageOrderListItem} data-test-id="order-list-item-link">
					<div className={styles.profilePageOrderListItemImage}>
						<ProductImage
							imageUrl={order.items[0].product.imageUrl}
							alt={order.items[0].product.name}
						/>
					</div>
					<div className={styles.profilePageOrderListItemInfo}>
						<p>Order Number: <span className={styles.profilePageOrderCode}>{order.code}</span></p>
						<p>Order Date: <FormattedDate timestamp={order.placedDate} /></p>
						<p>Items: <span>{order.totalUnits} - <span>{order.totalAmount} €</span></span></p>
					</div>
				</a>
			</Link>
		</li>
	)
};

function ProfilePage({ orders }: Props) {
	return (
		<section>
			<SectionTitle as="h1">Your orders</SectionTitle>
			<div className={styles.profilePageOrdersList}>
				<ol>
					{
						orders.map(order => (
							<OrderListItem key={order.id} order={order} />
						))
					}
				</ol>
			</div>
		</section>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = context.query.userId as string;

	const apolloClient = createApolloClient({
		context: { userId },
		schemaExtensions: [customerSchema, catalogSchema, checkoutSchema]
	});
	const apolloQueryData = await apolloClient.query({
		query: OrdersListQuery
	});

	return {
		props: {
			orders: apolloQueryData.data.userOrders
		}
	};
}

export default ProfilePage;

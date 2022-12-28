import { Order } from '@ps-ecommerce/types';

import { SectionTitle, FormattedDate } from '@ps-ecommerce/design-system';

import styles from './order-details-details-section.module.css';

type Props = {
	order: Order;
};

function OrderDetailsSection({ order }: Props) {
	return (
		<div>
			<SectionTitle size="small">Details</SectionTitle>
			<div className={styles.orderDetailsDetailsContainer}>
				<div>
					<h3 className={styles.orderDetailsOrderNumberTitle}>
						Order number
					</h3>
					<p>{order.code}</p>
					<p>
						<FormattedDate timestamp={order.placedDate} />
					</p>
				</div>
				<div className={styles.orderDetailsPayment}>
					<h3 className={styles.orderDetailsOrderNumberTitle}>
						Payment
					</h3>
					<p>{order.paymentData.paymentDetails.cardholder}</p>
					<p>{order.paymentData.paymentDetails.pan}</p>
				</div>
			</div>
		</div>
	);
}

export default OrderDetailsSection;

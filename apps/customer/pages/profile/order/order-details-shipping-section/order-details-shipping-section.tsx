import { Order } from '@ps-ecommerce/types';

import { SectionTitle } from '@ps-ecommerce/design-system';

import styles from './order-details-shipping-section.module.css';
import utilStyles from '@ds/utilities.module.css';

type Props = {
	order: Order
};

function OrderDetailsShippingSection({ order }: Props) {
	return (
		<div className={styles.orderDetailsShippingSection}>
			<SectionTitle size="small">Address</SectionTitle>
			<div className={utilStyles.marginTop_20}>
				<p>{order.shippingAddress.name} {order.shippingAddress.surname}</p>
				<p>{order.shippingAddress.addressLine}</p>
				<p>{order.shippingAddress.postalCode}, {order.shippingAddress.city}</p>
				<p>{order.shippingAddress.email}</p>
			</div>
		</div>
	);
}

export default OrderDetailsShippingSection;

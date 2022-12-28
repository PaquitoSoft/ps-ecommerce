import cx from 'classnames';

import { Order } from '@ps-ecommerce/types';

import { SectionTitle, utilStyles } from '@ps-ecommerce/design-system';

import styles from './order-details-totals-section.module.css';

type Props = {
	order: Order;
	className?: string;
};

function OrderDetailsTotalsSection({ order, className }: Props) {
	return (
		<div className={cx(className)}>
			<SectionTitle className={utilStyles.marginBottom_20} size="small">
				Totals
			</SectionTitle>
			<div className={styles.orderDetailsTotalsSectionRow}>
				<p>
					{order.totalUnits} {order.totalUnits > 1 ? 'items' : 'item'}
				</p>
				<p>{order.totalAmount} €</p>
			</div>
			<div className={styles.orderDetailsTotalsSectionRow}>
				<p>Delivery</p>
				<p>FREE</p>
			</div>
			<div
				className={cx(
					styles.orderDetailsTotalsSectionRow,
					styles.orderDetailsTotalsSectionTotalRow
				)}
			>
				<p>Amount</p>
				<p>{order.totalAmount} €</p>
			</div>
		</div>
	);
}

export default OrderDetailsTotalsSection;

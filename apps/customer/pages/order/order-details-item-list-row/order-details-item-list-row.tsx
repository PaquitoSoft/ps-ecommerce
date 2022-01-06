import cx from 'classnames';

import { OrderItem } from "@ps-ecommerce/types";

import { ProductImage } from '@ps-ecommerce/shared-ui-components';

import styles from './order-details-item-list-row.module.css';

type Props = {
	orderItem: OrderItem;
	className?: string;
};

function OrderDetailsItemListRow({ orderItem, className }: Props) {
	return (
		<li className={cx(styles.orderDetailsItemListRow, className)}>
			<div className={styles.orderDetailsItemListRowImage}>
				<ProductImage imageUrl={orderItem.product.imageUrl} alt={orderItem.product.name} />
			</div>
			<div>
				<h3 className={styles.orderDetailsItemListRowProductName}>{orderItem.product.name}</h3>

				<p>{orderItem.product.code}</p>
				<p>{orderItem.product.colorName}</p>
				<p>{orderItem.product.sizeName}</p>
				<p>{orderItem.quantity} x {orderItem.product.price} €</p>
			</div>
		</li>
	);
}

export default OrderDetailsItemListRow;

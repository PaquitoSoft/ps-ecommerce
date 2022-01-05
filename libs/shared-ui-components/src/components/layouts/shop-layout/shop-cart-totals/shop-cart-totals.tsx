import cx from 'classnames';

import { ShopCart } from '@ps-ecommerce/types';

import styles from './shop-cart-totals.module.css';

type Props = {
	shopCart: ShopCart;
	className?: string;
};

function ShopCartTotals({ shopCart, className }: Props) {
	return (
		<div className={cx(styles.shopCartTotals, className)}>
			<h2 className={styles.totalsLabel}>ORDER SUMMARY</h2>
			<div className={styles.totalsItem}>
				<span>{shopCart.totalUnits} ITEMS</span>
				<span>{shopCart.totalAmount}</span>
			</div>
			<div className={styles.totalsItem}>
				<span>DELIVERY</span>
				<span>FREE</span>
			</div>
			<div className={styles.totalsGrandTotal}>
				<span className={styles.grandTotalLabel}>TOTAL</span>
				<span className={styles.grandTotalAmount}>{shopCart.totalAmount} €</span>
			</div>
		</div>
	);
}

export default ShopCartTotals;

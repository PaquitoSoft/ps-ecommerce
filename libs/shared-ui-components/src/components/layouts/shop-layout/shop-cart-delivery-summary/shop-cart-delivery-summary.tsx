import Link from 'next/link';

import { ShippingAddress } from '@ps-ecommerce/types';

import { EditIcon } from '@ps-ecommerce/design-system';

import styles from './shop-cart-delivery-summary.module.css';

type Props = {
	shippingAddress: ShippingAddress;
}

function ShopCartDeliverySummary({ shippingAddress }: Props) {
	return (
		<section>
			<div className={styles.deliverySummaryTitleContainer}>
				<h3 className={styles.deliverySummaryTitle}>PICKUP ADDRESS</h3>
				<Link href="/shop/delivery"><a><EditIcon /></a></Link>
			</div>
			<div className={styles.deliverySummaryInfo}>
				<p>{shippingAddress.name} {shippingAddress.surname}</p>
				<p>{shippingAddress.addressLine}</p>
				<p>{shippingAddress.city} {shippingAddress.postalCode}</p>
			</div>
		</section>
	);
}

export default ShopCartDeliverySummary;

import { ShopCart, ShopCartItem } from '@ps-ecommerce/types';

import ProductImage from '../../../product-image/product-image';

import styles from './shop-cart-items-summary.module.css';

type Props = {
	shopCart: ShopCart;
}

function ItemSummary({ item }: { item: ShopCartItem }) {
	return (
		<li className={styles.itemSummary}>
			<div className={styles.itemImage}>
				<ProductImage imageUrl={item.product.imageUrl} alt={item.product.name} />
			</div>
			<div className={styles.itemSummaryInfo}>
				<div className={styles.itemText}>{item.product.name}</div>
				<div>
					<p>COLOR: {item.product.colorName}</p>
					<p className={styles.itemText}>SIZE: {item.product.sizeName} / Quantity: {item.quantity}</p>
				</div>
				<div>{item.quantity * item.product.price} €</div>
			</div>
		</li>
	)
}

function ShopCartItemSummary({ shopCart }: Props) {
	return (
		<section>
			<h3 className={styles.shopCartItemSummaryTitle}>ORDER DETAILS</h3>
			<ol className={styles.shopCartItemSummaryList}>
				{shopCart.items.map((item) => (<ItemSummary key={item.id} item={item} />))}
			</ol>
		</section>
	);
}

export default ShopCartItemSummary;

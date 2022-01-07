import Link from 'next/link';
import cx from 'classnames';

import { utils } from '@ps-ecommerce/shared-ui-logic';

import { ShopCartItem } from '@ps-ecommerce/types';

import { ProductImage } from '@ps-ecommerce/shared-ui-components';
import { FormSelect, IconButton, CloseIcon, FavoriteIcon } from '@ps-ecommerce/design-system';

import styles from './shop-cart-item.module.css';

type Props = {
	item: ShopCartItem;
	isInWishlist: boolean;
	className?: string;
	onUpdateItem(item: ShopCartItem, quantity: number): void;
	onRemoveItem(item: ShopCartItem): void;
	onWishlistSelectionUpdate(item: ShopCartItem): void;
}

function ShopCartItemComponent({
	item,
	isInWishlist,
	className,
	onUpdateItem,
	onRemoveItem,
	onWishlistSelectionUpdate
}: Props) {
	return (
		<div className={cx(styles.shopCartItem, className)}>
			<div className={styles.itemImage}>
				<Link href={`/product-detail/${item.product.code}`}>
					<a>
						<ProductImage
							imageUrl={item.product.imageUrl}
							alt={item.product.name}
						/>
					</a>
				</Link>
			</div>
			<div className={styles.itemDetails}>
				<div className={styles.itemDetailsInfo}>
					<div className={styles.itemDetailsInfoRow}>
						<Link href={`/product-detail/${item.product.code}`}>
							<a className={styles.itemDetailsName}>
								<span>{item.product.name}</span>
							</a>
						</Link>
						<span className={styles.itemDetailsPrice}>{item.quantity * item.product.price} €</span>
					</div>
					<div>
						<span>Size: {item.product.sizeName}</span>
					</div>
				</div>
				<div>
					<FormSelect
						className={styles.itemDetailsQuantity}
						value={item.quantity}
						onChange={(value) => onUpdateItem(item, +value)}
					>
						{utils.createArray(10).map((_, index) => (
							<option key={index} value={index + 1}>{index + 1}</option>
						))}
					</FormSelect>
				</div>
			</div>
			<div className={styles.itemActions}>
				<IconButton className={styles.itemActionIcon} size="small" onClick={() => onRemoveItem(item)}>
					<CloseIcon />
				</IconButton>
				<IconButton
					className={cx(styles.itemActionIcon, {
						[styles.shopCartItemInWishlist]: isInWishlist
					})}
					size="small"
					onClick={() => onWishlistSelectionUpdate(item)}
				>
					<FavoriteIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default ShopCartItemComponent;

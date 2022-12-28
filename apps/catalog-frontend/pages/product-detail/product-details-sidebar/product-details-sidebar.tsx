import { useState } from 'react';
import cx from 'classnames';

import { Product, Size } from '@ps-ecommerce/types';

import ProductSizeSelector from './product-size-selector/product-size-selector';
import {
	AlertBanner,
	Button,
	IconButton,
	FavoriteIcon,
	utilStyles,
} from '@ps-ecommerce/design-system';

import styles from './product-details-sidebar.module.css';

type Props = {
	product: Product;
	className: string;
	isWishlistedProduct: boolean;
	onAddToCart(product: Product, size: Size): void;
	onAddToFavorites(product: Product): void;
};

function ProductDetailsSidebar({
	product,
	className,
	isWishlistedProduct,
	onAddToCart,
	onAddToFavorites,
}: Props) {
	const [selectedSize, setSelectedSize] = useState<Size>();

	const onSizeSelected = (size: Size) => {
		setSelectedSize(size);
	};
	const _onAddToCart = () => {
		if (selectedSize) {
			onAddToCart(product, selectedSize);
		} else {
			throw new Error('TBD: You must select a size');
		}
	};
	const _onAddToFavorites = () => {
		onAddToFavorites(product);
	};

	return (
		<section className={cx(styles.productDetailsSidebar, className)}>
			<h1 className={styles.productName}>{product.name}</h1>
			<div className={styles.productPrice}>{product.price} €</div>
			<ProductSizeSelector
				className={utilStyles.marginTop_40}
				product={product}
				onSizeSelected={onSizeSelected}
				selectedSize={selectedSize}
			/>
			<AlertBanner className={utilStyles.marginTop_20}>
				<p>
					Christmas shopping? Check the latest delivery info in
					check-out to ensure you get it before Christmas.
				</p>
			</AlertBanner>
			<div className={styles.productActions}>
				<Button
					className={styles.addToCartButton}
					onClick={_onAddToCart}
					isDisabled={!selectedSize}
					testId="add-to-cart-button"
				>
					Add to bag
				</Button>
				<IconButton
					className={cx({
						[styles.wishlistIconSelected]: isWishlistedProduct,
					})}
					onClick={_onAddToFavorites}
				>
					<FavoriteIcon />
				</IconButton>
			</div>
		</section>
	);
}

export default ProductDetailsSidebar;

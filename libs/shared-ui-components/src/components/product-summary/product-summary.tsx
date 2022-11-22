import Link from "next/link";
import cx from 'classnames';

import { Product } from "@ps-ecommerce/types";

import ProductImage from "../product-image/product-image";
import { FavoriteIcon, Stamp } from "@ps-ecommerce/design-system";

import styles from './product-summary.module.css';

type Props = {
	categoryCode?: string;
	product: Product;
	imageSize?: number;
	className?: string;
	isWishlistedProduct: boolean;
	onWishlistSelectionUdpate(product: Product): void;
	showCategory?: boolean;
	showColors?: boolean;
}

function ProductSummary({
	product,
	imageSize,
	className,
	categoryCode,
	isWishlistedProduct = false,
	onWishlistSelectionUdpate,
	showCategory = true,
	showColors = false
}: Props) {
	const customSizeStyles = imageSize ? { height: imageSize, width: imageSize } : {};
	return (
		<Link href={`/product-detail/${product.code}${categoryCode ? '?grid=' + categoryCode : ''}`}>
			<a className={cx(styles.productSummary, className)}>
				<div className={styles.imageContainer} style={customSizeStyles}>
					<ProductImage
						imageUrl={product.gridImages[0]}
						alt={product.altName}
					/>
					<span
						className={cx(styles.productSummaryWishlistIcon, {
							[styles.productSummaryWishlistIcon__active]: isWishlistedProduct
						})}
						onClick={(event) => {
							event.preventDefault();
							onWishlistSelectionUdpate(product);
						}}
					>
						<FavoriteIcon />
					</span>
					{
						product.isPopular ?
						<span className={styles.productSummaryOnFireStamp}>
							<Stamp>POPULAR</Stamp>
						</span> :
						null
					}
				</div>
				<div className={styles.productInfo}>
					<div className={styles.productPrice}>{product.price} €</div>
					<div className={styles.productName}>{product.name}</div>
					{
						showCategory &&
						<div className={styles.productCategory}>{product.categoryName}</div>
					}
					{
						showColors && product.colors.length > 1 &&
						<div className={styles.productColors}>{product.colors.length} colors</div>
					}
				</div>
			</a>
		</Link>
	);
}

export default ProductSummary;

import { useRef } from 'react';
import cx from 'classnames';

import { Product } from '@ps-ecommerce/types';

import { SectionTitle } from '@ps-ecommerce/design-system';
import ProductSummary from '../product-summary/product-summary';

import useProductsCarousel from './use-products-carousel';

import styles from './products-carousel.module.css';
import utilStyles from '@ds/utilities.module.css';

export type MoveDirection = 'left' | 'right';

type Props = {
	title: string;
	imageSize: number;
	products: Product[];
	categoryCode?: string;
}

function CarouselButton(
	{ direction, onClick }:
	{ direction: MoveDirection, onClick: (direction: MoveDirection) => void }
) {
	return (
		<button className={cx(styles.carouselButton, styles[`carouselButton_${direction}`])} onClick={() => onClick(direction)}>
			<img
				src={`/images/icons/arrow-${direction}-icon.svg`}
				alt={`Move carousel to the ${direction}`}
				height={24}
				width={24}
			/>
		</button>
	);
}

function ProductsCarousel({
	title,
	imageSize,
	products,
	categoryCode
}: Props) {
	const containerRef = useRef<HTMLUListElement>(null);
	const {
		state: {
			edges
		},
		actions: {
			moveCarousel,
			isProductInWishlist,
			updateProductInWishlist
		}
	} = useProductsCarousel({
		productsContainerRef: containerRef,
		movementStepSize: imageSize + 7 // magin number is the gap between products plus its borders
	});

	return (
		<div className={styles.productsCarousel} data-test-id="products-carousel">
			<SectionTitle as='h2' className={utilStyles.marginBottom_15}>{title}</SectionTitle>
			<ul
				className={styles.productsCarouselContainer}
				ref={containerRef}
			>
				{products.map(product => (
					<li key={product.code} className={styles.productElement}>
						<ProductSummary
							product={product}
							imageSize={imageSize}
							categoryCode={categoryCode}
							isWishlistedProduct={isProductInWishlist(product.id)}
							onWishlistSelectionUdpate={updateProductInWishlist}
						/>
					</li>
				))}
			</ul>
			<div>
				{
					!edges.start &&
					<CarouselButton direction="left" onClick={moveCarousel} />
				}
				{
					!edges.end &&
					<CarouselButton direction="right" onClick={moveCarousel} />
				}
			</div>
		</div>
	);
}

export default ProductsCarousel;

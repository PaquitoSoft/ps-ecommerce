import { useRef, useState } from 'react';
import cx from 'classnames';

import { Product } from '@ps-ecommerce/types';

import { ProductImage } from '@ps-ecommerce/shared-ui-components';

import { IconButton, ArrowLeftIcon, ArrowRightIcon } from '@ps-ecommerce/design-system';
import ImagesSelector from './images-selector/images-selector';

import styles from './product-images-carousel.module.css';

type Props = {
	product: Product;
	className?: string;
};

function ProductImagesCarousel({ product, className }: Props) {
	const $container = useRef<HTMLDivElement>(null);
	const [{ carouselPosition, carouselIndex }, setCarouselData] = useState({ carouselPosition: 0, carouselIndex: 0})

	const moveCarousel = (newIndex: number) => {
		setCarouselData({
			carouselIndex: newIndex,
			carouselPosition: (newIndex * $container.current?.clientWidth) * -1
		});
	}

	let carouselItems = [];
	if (!$container.current) {
		carouselItems = [
			<li key={product.detailImages[0]} className={styles.carouselItem} >
				<ProductImage
					imageUrl={product.detailImages[0]}
					alt={product.altName}
					imageFit="contain"
				/>
			</li>
		]
	} else {
		carouselItems = [product.detailImages.map(imageUrl => (
			<li key={imageUrl} className={styles.carouselItem} style={{ width: $container.current?.clientWidth || 0 }}>
				<ProductImage
					imageUrl={imageUrl}
					alt={product.altName}
					imageFit="contain"
				/>
			</li>
		))]	;
	}

	return (
		<div className={cx(styles.productImagesCarousel, className)} ref={$container}>
			<ul className={styles.carouselContainer} style={{ transform: `translateX(${carouselPosition}px)`}}>
				{carouselItems}
			</ul>
			{
				carouselIndex !== 0 &&
				<IconButton className={styles.leftArrow} onClick={() => moveCarousel(carouselIndex - 1)}>
					<ArrowLeftIcon />
				</IconButton>
			}
			{
				carouselIndex < product.detailImages.length - 1 &&
				<IconButton className={styles.rightArrow} onClick={() => moveCarousel(carouselIndex + 1)}>
					<ArrowRightIcon />
				</IconButton>
			}
			<ImagesSelector
				imagesUrls={product.detailImages}
				productName={product.altName}
				onImageSelected={moveCarousel}
				selectedImageIndex={carouselIndex}
			/>
		</div>
	);
}

export default ProductImagesCarousel;

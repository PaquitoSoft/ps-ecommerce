import cx from 'classnames';
import { Product, Size } from '@ps-ecommerce/types';

import styles from './product-size-selector.module.css';

type Props = {
	product: Product;
	onSizeSelected(size: Size, product: Product): void;
	className?: string;
	selectedSize?: Size;
};

function ProductSizeSelector({
	product,
	onSizeSelected,
	className,
	selectedSize,
}: Props) {
	return (
		<div className={className} data-test-id="size-selector">
			<h3 className={styles.selectorTitle}>Select your size:</h3>
			<ol className={styles.sizesContainer}>
				{product.sizes
					.filter((size) => size.availability !== 'NOT_AVAILABLE')
					.map((size) => (
						<li key={size.code}>
							<button
								className={cx(styles.sizeButton, {
									[styles.sizeButtonSelected]:
										size.code === selectedSize?.code,
								})}
								onClick={() => onSizeSelected(size, product)}
							>
								{size.name}
							</button>
						</li>
					))}
			</ol>
		</div>
	);
}

export default ProductSizeSelector;

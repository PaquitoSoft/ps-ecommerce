import Link from 'next/link';

import { Color } from '@ps-ecommerce/types';
import { ProductImage } from '@ps-ecommerce/shared-ui-components';

import styles from './product-color-selector.module.css';

type Props = {
	colors: Color[];
	categoryCode?: string;
};

function ProductColorSelector({ colors, categoryCode }: Props) {
	return (
		<div className={styles.productColorSelector}>
			<div className={styles.colorsInfo}>
				<h5 className={styles.colorsCount}>
					{colors.length} Colours available
				</h5>
				<h5 className={styles.colorName}>{colors[0].name}</h5>
			</div>
			<ul className={styles.colorsList}>
				{colors.map((color, index) => (
					<li
						key={`${color.productId}_${index}`}
						className={styles.colorItem}
					>
						<Link
							href={`/product-detail/${color.productId}${
								categoryCode ? '?grid=' + categoryCode : ''
							}`}
						>
							<a>
								<ProductImage
									imageUrl={color.imageUrl}
									alt={color.name}
								/>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ProductColorSelector;

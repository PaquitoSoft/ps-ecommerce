import cx from 'classnames';

import { ProductImage } from '@ps-ecommerce/shared-ui-components';

import styles from './images-selector.module.css';

type Props = {
	imagesUrls: string[];
	onImageSelected(index: number): void;
	selectedImageIndex: number;
	productName: string;
};

function ImagesSelector({
	imagesUrls,
	onImageSelected,
	productName,
	selectedImageIndex,
}: Props) {
	return (
		<nav className={styles.imagesSelector}>
			<ul className={styles.imagesContainer}>
				{imagesUrls.map((url, index) => (
					<li
						key={url}
						className={cx(styles.imageItem, {
							[styles.imageItem_selected]:
								selectedImageIndex === index,
						})}
						onClick={() => onImageSelected(index)}
					>
						<ProductImage imageUrl={url} alt={productName} />
					</li>
				))}
			</ul>
		</nav>
	);
}

export default ImagesSelector;

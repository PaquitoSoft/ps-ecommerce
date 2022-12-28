import { ProductImage } from '@ps-ecommerce/shared-ui-components';

import { ProductDescription } from '@ps-ecommerce/types';

import styles from './product-description.module.css';

type Props = {
	description: ProductDescription;
};

function ProductDescriptionComponent({ description }: Props) {
	return (
		<div className={styles.productDescription}>
			<div className={styles.descriptionInfo}>
				<h5 className={styles.descriptionTitle}>{description.title}</h5>
				<h5 className={styles.descriptionSubtitle}>
					{description.subtitle}
				</h5>
				<div className={styles.descriptionText}>{description.text}</div>
			</div>
			<div className={styles.descriptionImage}>
				<ProductImage
					imageUrl={description.assetUrl}
					alt={description.title}
				/>
			</div>
		</div>
	);
}

export default ProductDescriptionComponent;

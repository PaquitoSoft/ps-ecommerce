import { Product } from '@ps-ecommerce/types';

import { ProductsCarousel } from '@ps-ecommerce/shared-ui-components';

import styles from './product-related-products.module.css';

type Props = {
	relatedProducts: Product[];
	categoryCode?: string;
};

function ProductRelatedProducts({ relatedProducts, categoryCode }: Props) {
	return (
		<div className={styles.productRelatedProducts}>
			<ProductsCarousel
				products={relatedProducts}
				categoryCode={categoryCode}
				title="YOU MAY ALSO LIKE"
				imageSize={200}
			/>
		</div>
	);
}

export default ProductRelatedProducts;

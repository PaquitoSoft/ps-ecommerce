import cx from 'classnames';

import { Product } from '@ps-ecommerce/types';

import ProductColorSelector from './product-color-selector/product-color-selector';
import ProductDescriptionComponent from './product-description/product-description';
import ProductImagesCarousel from './product-images-carousel/product-images-carousel';
import ProductRelatedProducts from './product-related-products/product-related-products';
import ProductSpecs from './product-specs/product-specs';

import styles from './product-details-content.module.css';

type Props = {
	product: Product;
	relatedProducts?: Product[];
	className?: string;
	categoryCode?: string;
};

function ProductDetailsContent({
	product,
	relatedProducts,
	className,
	categoryCode,
}: Props) {
	return (
		<div className={cx(styles.productDetailsContent, className)}>
			<ProductImagesCarousel
				key={`${product.code}_carousel`}
				product={product}
			/>
			{product.colors.length > 1 && (
				<ProductColorSelector
					key={`${product.code}_colors`}
					colors={product.colors}
					categoryCode={categoryCode}
				/>
			)}
			<ProductDescriptionComponent
				key={`${product.code}_description`}
				description={product.description}
			/>
			<ProductSpecs specs={product.specs} />
			{relatedProducts && relatedProducts.length > 0 && (
				<ProductRelatedProducts
					relatedProducts={relatedProducts}
					categoryCode={categoryCode}
				/>
			)}
		</div>
	);
}

export default ProductDetailsContent;

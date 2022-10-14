import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';

import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { createApolloClient } from '@ps-ecommerce/shared-server';

import { Product } from '@ps-ecommerce/types';

import ProductDetailsSidebar from './product-details-sidebar/product-details-sidebar';
import ProductDetailsContent from './product-details-content/product-details-content';
import AddToCartConfirmationModal from './add-to-cart-confirmation-modal/add-to-cart-confirmation-modal';

import useProductDetailsPage from './use-product-details-page';

import styles from './product-details.module.css';

type Props = {
	product: Product;
	relatedProducts?: Product[];
}

const ProductQuery = gql`
	query ProductQuery($productCode: String!) {
		product(productCode: $productCode) {
			id
			code
			name
			altName
			detailImages
			colorName
			colors {
				name
				imageUrl
				productId
			}
			description {
				assetUrl
				title
				subtitle
				text
			}
			sizes {
				code
				name
				availability
			}
			specs
			price
		}
	}
`;

const RelatedProductsQuery = gql`
	query RelatedProductsQuery($categoryCode: String!, $count: Int, $randomValues: Boolean) {
		productsByCategory(categoryCode: $categoryCode, count: $count, randomValues: $randomValues) {
			totalCount
			products {
				id
				code
				name
				altName
				gridImages
				price
			}
		}
	}
`;

function ProductDetailsPage({ product, relatedProducts }: Props) {
	const { query } = useRouter();
	const {
		state: { isWishlistedProduct, isAddToCartConfirmationModalOpen, shopCart, addedSize },
		actions: { addToCart, addToFavorites, closeAddToCartConfirmationModal }
	} = useProductDetailsPage(product);
	const categoryCode = query.grid as string;

	return (
		<div className={styles.productDetailPage}>
			<ProductDetailsContent
				product={product}
				className={styles.productContent}
				relatedProducts={relatedProducts}
				categoryCode={categoryCode}
			/>

			<ProductDetailsSidebar
				product={product}
				className={styles.productSidebar}
				isWishlistedProduct={isWishlistedProduct!}
				onAddToCart={addToCart}
				onAddToFavorites={addToFavorites}
			/>

			{
				isAddToCartConfirmationModalOpen &&
				<AddToCartConfirmationModal
					addedProduct={product}
					addedSize={addedSize!}
					shopCart={shopCart}
					onClose={closeAddToCartConfirmationModal}
				/>
			}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const productCode = context.params!.code as string;
	const categoryCode = context.query!.grid as string;


	const apolloClient = createApolloClient({
		schemaExtensions: [catalogSchema]
	});
	const dataPromises = [
		apolloClient.query({
			query: ProductQuery,
			variables: { productCode }
		})
	];

	if (categoryCode) {
		dataPromises.push(apolloClient.query({
			query: RelatedProductsQuery,
			variables: {
				categoryCode,
				count: 8,
				randomValues: true
			}
		}));
	}

	const [productQueryData, relatedProductsQueryData] = await Promise.all(dataPromises);

	if (!productQueryData.data.product) {
		return { notFound: true };
	}

	return {
		props: {
			product: productQueryData.data.product,
			relatedProducts: relatedProductsQueryData ? relatedProductsQueryData.data.productsByCategory.products : null
		}
	};
}

export default ProductDetailsPage;

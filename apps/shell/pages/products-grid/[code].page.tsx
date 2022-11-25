/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';

import { graphqlSchemaExtensions as catalogSchema } from '@ps-ecommerce/catalog-backend';
import { createApolloClient } from '@ps-ecommerce/shared-server';

import { Product, Category } from '@ps-ecommerce/types'

import { ProductSummary } from '@ps-ecommerce/shared-ui-components';

import useProductsGrid from './use-products-grid';

import styles from './products-grid.module.css';

const PRODUCTS_PER_PAGE = 24;

type PageProps = {
	category: Category;
	products: Product[];
	totalProductsCount: number;
};

type PaginatorProps = {
	categoryCode: string,
	currentPage: number,
	totalPagesCount: number
};

type LinkProps = {
	categoryCode: string;
	pageNumber: number;
	isVisible: boolean;
	children: React.ReactNode;
};

const ProductsGridDataQuery = gql`
	query ProductsGridDataQuery($categoryCode: String!, $start: Int!, $count: Int!) {
		category(categoryCode: $categoryCode) {
			id
			name
			code
		}
		productsByCategory(categoryCode: $categoryCode, start: $start, count: $count) {
			totalCount
			products {
				id
				code
				name
				altName
				gridImages
				price
				colors {
					name
				}
				isPopular
			}
		}
	}
`;

function PaginatorLink({ categoryCode, pageNumber, isVisible, children }: LinkProps) {
	return (
		<Link href={`/products-grid/${categoryCode}?page=${pageNumber}`}>
			<a className={styles.gridLink} style={{ visibility: `${isVisible ? 'visible': 'hidden'}` }}>{children}</a>
		</Link>
	);
}

function GridPaginator({ categoryCode, currentPage, totalPagesCount }: PaginatorProps) {
	return (
		<nav className={styles.gridPaginator}>
			<PaginatorLink categoryCode={categoryCode} pageNumber={currentPage - 1} isVisible={currentPage !== 1}>PREVIOUS</PaginatorLink>
			<div>
				<span>Page:</span>
				<span className={styles.gridPaginatorCurrentPage}>
					{currentPage}
				</span>
				<span>from {totalPagesCount}</span>
			</div>
			<PaginatorLink categoryCode={categoryCode} pageNumber={currentPage + 1} isVisible={currentPage !== totalPagesCount}>NEXT</PaginatorLink>
		</nav>
	)
}

function ProductsGrid({ category, products, totalProductsCount }: PageProps) {
	const {
		state: {
			pageNumber,
			categoryCode,
			totalPagesCount
		},
		actions: {
			isProductInWishlist,
			updateProductInWishlist
		}
	} = useProductsGrid({
		totalProductsCount,
		productsPerPage: PRODUCTS_PER_PAGE
	});

	return (
		<div>
			<div>
				<h1 className={styles.categoryTitle}>{category.name}</h1>
				<span className={styles.totalProductsCount}>[{totalProductsCount}]</span>
			</div>
			<ul className={styles.productsGridContainer}>
				{products.map(product => (
					<li key={product.code}>
						<ProductSummary
							className={styles.productsGridItem}
							product={product}
							categoryCode={categoryCode}
							showColors={true}
							isWishlistedProduct={isProductInWishlist(product.id)}
							onWishlistSelectionUdpate={updateProductInWishlist}
						/>
					</li>
				))}
			</ul>
			<GridPaginator
				categoryCode={categoryCode}
				currentPage={pageNumber}
				totalPagesCount={totalPagesCount}
			/>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const categoryCode = context.params!.code as string;
	const pageNumber: number = +context.query.page! || 1;

	const apolloClient = createApolloClient({
		endpointUrl: process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL,
	});

	const apolloQueryData = await apolloClient.query({
		query: ProductsGridDataQuery,
		variables: {
			categoryCode,
			start: (pageNumber - 1) * PRODUCTS_PER_PAGE,
			count: PRODUCTS_PER_PAGE
		}
	});

	return {
		props: {
			category: apolloQueryData.data.category,
			products: apolloQueryData.data.productsByCategory.products,
			totalProductsCount: apolloQueryData.data.productsByCategory.totalCount
		}
	};
}

export default ProductsGrid;

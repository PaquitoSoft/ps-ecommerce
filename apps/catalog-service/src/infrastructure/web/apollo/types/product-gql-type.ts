import { gql } from '@apollo/client';
import { Product } from '@ps-ecommerce/types';

import findProductAction from '../../../../application/use-cases/product/find-product-action';
import findProductsByCategoryAction from '../../../../application/use-cases/product/find-products-by-category-action';
import ApolloContext from '../apollo-context';

export const typeDef = gql`
	type SeoInfo {
		title: String!
		keywords: String!
		description: String!
	}

	type Color {
		name: String
		imageUrl: String
		productId: String
	}

	type ProductDescription {
		assetUrl: String
		title: String!
		subtitle: String!
		text: String!
	}

	type Size {
		code: String!
		name: String!
		availability: String!
	}

	type Product {
		id: String!
		code: String!
		name: String!
		altName: String!
		categoryName: String!
		gridImages: [String]!
		seo: SeoInfo
		colorName: String!
		colors: [Color]!
		description: ProductDescription
		specs: [String]!
		price: Float
		detailImages: [String]
		sizes: [Size]
	}

	type FeaturedProducts {
		newArrivals: [Product]!
		topSellers: [Product]!
		trending: [Product]!
	}

	type PaginatedProductsResult {
		products: [Product]!
		totalCount: Int!
	}

	extend type Query {
		productsByCategory(categoryCode: String!, start: Int, count: Int, randomValues: Boolean): PaginatedProductsResult!
		featuredProducts(count: Int): FeaturedProducts!
		product(productCode: String!): Product
	}
`;

const productsByCategory = async (
	_parent: unknown,
	args: {
		categoryCode: string;
		start?: number;
		count?: number;
		randomValues?: boolean;
	},
	context: ApolloContext
) => {
	const { categoryCode, start = 0, count = 1, randomValues = false } = args;

	const productsResult = await findProductsByCategoryAction({
		categoryCode,
		start,
		count,
		randomValues
	}, {
		productRepository: context.dataSources.product
	});

	return productsResult;
};

const featuredProducts = async (
	_parent: unknown,
	args: {
		count?: number;
	},
	context: ApolloContext
) => {
	const { count = 8 } = args;
	const featuredCategoriesCodes = ['new_arrivals', 'top_sellers', 'trending'];

	const [newArrivalsResult, topSellersResult, trendingResult] = await Promise.all(
		featuredCategoriesCodes.map(categoryCode => findProductsByCategoryAction({
				categoryCode,
				count,
				randomValues: true
			}, {
				productRepository: context.dataSources.product
			}
		))
	);

	return {
		newArrivals: newArrivalsResult.products,
		topSellers: topSellersResult.products,
		trending: trendingResult.products
	};
};

const productDetails = async (
	_parent: unknown,
	args: {
		productCode: string;
	},
	context: ApolloContext
) => {
	const { productCode } = args;

	const product = await findProductAction(productCode, {
		productRepository: context.dataSources.product
	});

	return product;
};

export const resolvers = {
	Product: {
		id: (root: { _id?: unknown; id?: unknown; }) => root._id || root.id,
		sizes: (root: Product) => root.sizes.map((size) => ({
			code: size.code,
			name: size.name,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			avaialability: size.avaialability
		}))
	},
	Query: {
		productsByCategory,
		featuredProducts,
		product: productDetails
	}
};
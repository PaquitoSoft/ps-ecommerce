import { gql } from '@apollo/client';
import ProductRepository from '../../../../domain/product/product-repo';
import { buildRepository, RepositoryType } from '../../../repositories/repository-factory';
import findProductAction from '../../../../application/use-cases/product/find-product-action';
import findProductsByCategoryAction from '../../../../application/use-cases/product/find-products-by-category-action';

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

const productsByCategory = async (parent: any, args: any) => {
	const { categoryCode, start = 0, count = 1, randomValues = false } = args;

	const productRepository = await buildRepository<ProductRepository>(RepositoryType.Product);
	const productsResult = await findProductsByCategoryAction({
		categoryCode,
		start,
		count,
		randomValues
	}, { productRepository });

	return productsResult;
};

const featuredProducts = async (parent: any, args: any) => {
	const { count = 8 } = args;
	const featuredCategoriesCodes = ['new_arrivals', 'top_sellers', 'trending'];

	const productRepository = await buildRepository<ProductRepository>(RepositoryType.Product);
	const [newArrivalsResult, topSellersResult, trendingResult] = await Promise.all(
		featuredCategoriesCodes.map(categoryCode => findProductsByCategoryAction({
				categoryCode,
				count,
				randomValues: true
			}, { productRepository }
		))
	);

	return {
		newArrivals: newArrivalsResult.products,
		topSellers: topSellersResult.products,
		trending: trendingResult.products
	};
};

const productDetails = async (parent: any, args: any) => {
	const { productCode } = args;

	const productRepository = await buildRepository<ProductRepository>(RepositoryType.Product);
	const product = await findProductAction(productCode, { productRepository });

	return product;
};

export const resolvers = {
	Product: {
		id: (root: { _id: any; id: any; }) => root._id || root.id,
		sizes: (root: any) => root.sizes.map((size: { code: any; name: any; avaialability: any; }) => ({
			code: size.code,
			name: size.name,
			availability: size.avaialability
		}))
	},
	Query: {
		productsByCategory,
		featuredProducts,
		product: productDetails
	}
};

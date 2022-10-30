import { gql } from '@apollo/client';

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
`;

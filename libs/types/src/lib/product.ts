import mongoose from 'mongoose';

type SeoInfo = {
	title: string;
	keywords: string;
	description: string;
}

export type Color = {
	name: string;
	imageUrl: string;
	productId: string;
}

export type ProductDescription = {
	assetUrl: string;
	title: string;
	subtitle: string;
	text: string;
};

export type Size = {
	code: string;
	name: string;
	availability: 'IN_STOCK' | 'NOT_AVAILABLE';
};

type Product = {
	id: string;
	code: string;
	name: string;
	altName: string;
	categoryName: string;
	gridImages: string[];
	seo: SeoInfo;
	colorName: string;
	colors: Color[];
	description: ProductDescription;
	specs: string[];
	price: number;
	detailImages: string[];
	sizes: Size[];
	categories: mongoose.Types.ObjectId[];
	isPopular: boolean;
};

export default Product;

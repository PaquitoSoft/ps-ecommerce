import ProductRepository from '../../../domain/product-repo';

type FindProductsByCategoryActionParams = {
	categoryCode: string;
	start?: number;
	count: number;
	randomValues?: boolean;
};

function findProductsByCategoryAction({
		categoryCode,
		start = 0,
		count = 1,
		randomValues = false
	}: FindProductsByCategoryActionParams,
	{ productRepository }: { productRepository: ProductRepository }
) {
	return productRepository.findByCategoryCode({
		categoryCode,
		start,
		count,
		randomValues
	});
}

export default findProductsByCategoryAction;

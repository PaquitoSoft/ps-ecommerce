import ProductRepository from '../../../domain/product-repo';

function findProductsByProductsIdsAction({
		productsIds
	}: { productsIds?: string[] },
	{
		productRepository
	}: { productRepository: ProductRepository }
) {
	if (!productsIds) return [];
	return productRepository.findByProductsIds(productsIds);
}

export default findProductsByProductsIdsAction;

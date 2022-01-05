import ProductRepository from '../../../domain/product/product-repo';

function findProductAction(
	productCode: string,
	{ productRepository }: { productRepository: ProductRepository }
) {
	return productRepository.findByProductCode(productCode);
}

export default findProductAction;

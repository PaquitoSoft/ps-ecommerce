import CategoryRepository from '../../../domain/category/category-repo';

function findCategoryAction(
	categoryCode: string,
	{ categoryRepository }: { categoryRepository: CategoryRepository }
) {
	return categoryRepository.findByCode(categoryCode);
}

export default findCategoryAction;

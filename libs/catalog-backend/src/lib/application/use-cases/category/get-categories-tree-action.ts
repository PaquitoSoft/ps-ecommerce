import CategoryRepository from '../../../domain/category/category-repo';

function getCategoriesTreeAction(
	{ categoryRepository }: { categoryRepository: CategoryRepository }
) {
	return categoryRepository.getTree();
}

export default getCategoriesTreeAction;

import { gql } from '@apollo/client';
import CategoryRepository from '../../../../domain/category/category-repo';
import { buildRepository, RepositoryType } from '../../../repositories/repository-factory';
import findCategoryAction from '../../../../application/use-cases/category/find-category-action';
import getCategoriesTreeAction from '../../../../application/use-cases/category/get-categories-tree-action';

export const typeDef = gql`
	type Category {
		id: ID!
		code: String!
		name: String!
		isHidden: Boolean
		subcategories: [Category]
	}

	extend type Query {
		categoriesTree: [Category]
		category(categoryCode: String!): Category
	}
`;

const getCategoriesTree = async () => {
	const categoryRepository = await buildRepository<CategoryRepository>(RepositoryType.Category);
	const categoriesTree = await getCategoriesTreeAction({ categoryRepository });

	return categoriesTree;
};

const findCategory = async (root: any, args: any) => {
	const categoryRepository = await buildRepository<CategoryRepository>(RepositoryType.Category);
	const category = await findCategoryAction(args.categoryCode as string, { categoryRepository });

	return category;
};

export const resolvers = {
	Category: {
		id: (root: { _id: any; id: any; }) => root._id || root.id
	},
	Query: {
		categoriesTree: getCategoriesTree,
		category: findCategory
	}
};

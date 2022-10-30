import { gql } from '@apollo/client';

import findCategoryAction from '../../../../application/use-cases/category/find-category-action';
import getCategoriesTreeAction from '../../../../application/use-cases/category/get-categories-tree-action';
import ApolloContext from '../apollo-context';

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

const getCategoriesTree = async (
	_parent: unknown,
	_args: unknown,
	context: ApolloContext
) => {
	const categoriesTree = await getCategoriesTreeAction({
		categoryRepository: context.dataSources.category
	});

	return categoriesTree;
};

const findCategory = async (
	_root: unknown,
	args: { categoryCode: string },
	context: ApolloContext
) => {
	const category = await findCategoryAction(args.categoryCode as string, {
		categoryRepository: context.dataSources.category
	});

	return category;
};

export const resolvers = {
	Category: {
		id: (root: { _id?: string; id?: string; }) => root._id || root.id
	},
	Query: {
		categoriesTree: getCategoriesTree,
		category: findCategory
	}
};

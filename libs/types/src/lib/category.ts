
type Category = {
	id: string;
	code?: string;
	name: string;
	isHidden: boolean;
	subcategories: any[];
	parent?: any;
};

export default Category;

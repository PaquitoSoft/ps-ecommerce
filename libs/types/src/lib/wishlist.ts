import { Types } from "mongoose";
import Product from "./product";

type Wishlist = {
	id: string;
	userId: string;
	name: string;
	productsIds: Types.ObjectId[];
	products: Product[] | Types.ObjectId[];
};

export default Wishlist;

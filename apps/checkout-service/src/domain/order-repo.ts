import { Order } from "@ps-ecommerce/types";
import { Repository } from '@ps-ecommerce/shared-server';
import CustomerNewOrder from "../types/customer-new-order";

interface OrderRepository extends Repository {
	create(order: CustomerNewOrder): Promise<Order>;
};

export default OrderRepository;

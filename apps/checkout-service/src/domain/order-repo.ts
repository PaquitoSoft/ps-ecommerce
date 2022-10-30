import { Order } from "@ps-ecommerce/types";
import { Repository } from '@ps-ecommerce/shared-server';

interface OrderRepository extends Repository {
	create(order: Order): Promise<Order>;
};

export default OrderRepository;

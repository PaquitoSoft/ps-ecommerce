import { Order } from "@ps-ecommerce/types";

type NewOrder = Omit<Order, 'code' | 'totalUnits' | 'totalAmount' | 'placedDate' | 'estimatedDeliveryDate' | 'deliveryCost'>;

export default NewOrder;

import { Order } from '@ps-ecommerce/types';
import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { gql } from 'apollo-server';
import OrderRepository from '../../domain/order-repo';
import CustomerNewOrder from '../../types/customer-new-order';
import ApolloContext from '../web/apollo/apollo-context';

const CREATE_ORDER_MUTATION = gql`
	mutation CreateOrder($newOrder: NewOrder!) {
		createOrder(newOrder: $newOrder) {
			id
			code
			deliveryCost
			placedDate
			estimatedDeliveryDate
			userId
			items {
				id
				quantity
				product {
					code
					name
					sizeCode
					sizeName
					price
					colorName
					imageUrl
				}
			}
			shippingAddress {
				email
				name
				surname
				addressLine
				postalCode
				city
			}
			paymentData {
				paymentMethod
				paymentDetails {
					pan
					cardholder
				}
			}
			totalUnits
			totalAmount
		}
	}
`;

class GraphqlOrderRepository extends GraphQLDataSource<ApolloContext> implements OrderRepository {
	constructor(endpointUrl: string) {
		super();
		super.baseURL = endpointUrl;
	}

	willSendRequest(request: { headers?: Record<string, string>}) {
		if (!request.headers) {
			request.headers = {};
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		request.headers.authorization = this.context.userId;
	}

	async create(newOrder: CustomerNewOrder): Promise<Order> {
		const response = await super.mutation(CREATE_ORDER_MUTATION, {
			variables: {
				newOrder
			}
		});

		return response.data.createOrder;
	}
}

export default GraphqlOrderRepository;

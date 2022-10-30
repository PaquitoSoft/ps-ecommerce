import { Order } from '@ps-ecommerce/types';
import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { gql } from 'apollo-server';
import OrderRepository from '../../domain/order-repo';
import ApolloContext from '../web/apollo/apollo-context';

const CREATE_ORDER_MUTATION = gql`
	mutation CreateOrder($order: Order!) {
		createOrder(order: $order) {
			id
			code
			deliveryCost
			placedDate
			estimatedDeliveryDate
			userId,
			items
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
					expirationDate
					cvv
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
		super.baseUrl = endpointUrl;
	}

	// TODO: Fix this type
	willSendRequest(request: any) {
		console.log('GraphQLProductRepo::willSendRequest# Request:', { request });
		request.headers.authorization = super.context.userId;
	}

	async create(order: Order): Promise<Order> {
		const response = await super.mutation(CREATE_ORDER_MUTATION, {
			variables: {
				order
			}
		});

		return response.data.createOrder;
	}
}

export default GraphqlOrderRepository;

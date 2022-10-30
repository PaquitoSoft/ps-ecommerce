import { Product } from '@ps-ecommerce/types';
import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { gql } from 'apollo-server';
import ProductRepository from '../../domain/product-repo';
import ApolloContext from '../web/apollo/apollo-context';

const GET_PRODUCT_QUERY = gql`
	query GetProductByCode($productCode: String!) {
		product(productCode: $productCode) {
			id
			code
			name
			colorName
			sizes {
				code
				name
				availability
			}
			price
			gridImages
		}
	}
`;

// class BridgeDataSource extends GraphQLDataSource<ApolloContext>{}

class GraphqlProductRepository extends GraphQLDataSource<ApolloContext> implements ProductRepository {
	constructor(endpointUrl: string) {
		super();
		super.baseUrl = endpointUrl;
	}

	// TODO: Fix this type
	willSendRequest(request: any) {
		console.log('GraphQLProductRepo::willSendRequest# Request:', { request });
		request.headers.authorization = super.context.userId;
	}

	async findByProductCode(productCode: string): Promise<Product> {
		const response = super.query(GET_PRODUCT_QUERY, {
			variables: {
				productCode
			}
		});

		return response.data.product;
	}
}

export default GraphqlProductRepository;

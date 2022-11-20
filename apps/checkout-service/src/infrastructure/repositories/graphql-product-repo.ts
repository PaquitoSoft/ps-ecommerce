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

class GraphqlProductRepository extends GraphQLDataSource<ApolloContext> implements ProductRepository {
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

	async findByProductCode(productCode: string): Promise<Product> {
		const response = await super.query(GET_PRODUCT_QUERY, {
			variables: {
				productCode
			}
		});
		return response.data.product;
	}
}

export default GraphqlProductRepository;

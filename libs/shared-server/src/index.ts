export { schema as apolloGraphqlSchema } from './infrastructure/web/apollo/schema';
export { createApolloClient } from './infrastructure/web/apollo/apollo-server-client';

import * as bigintType from './infrastructure/web/apollo/types/bigint-gql-type';
import * as shippingAddressType from './infrastructure/web/apollo/types/shipping-address-gql-type';
export const infraestrcture = {
	web: {
		apollo: {
			types: {
				bigint: bigintType,
				shippingAddress: shippingAddressType
			}
		}
	}
};

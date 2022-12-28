import { gql } from '@apollo/client';

// TODO: This is duplicated here and in the checkout service
export const typeDef = gql`
	type OrderShippingAddress {
		email: String!
		name: String!
		surname: String!
		addressLine: String!
		postalCode: String!
		city: String!
	}
`;

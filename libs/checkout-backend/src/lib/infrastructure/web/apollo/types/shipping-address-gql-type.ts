import { gql } from '@apollo/client'

export const typeDef = gql`
	type ShippingAddress {
		email: String!
		name: String!
		surname: String!
		addressLine: String!
		postalCode: String!
		city: String!
	}
`;

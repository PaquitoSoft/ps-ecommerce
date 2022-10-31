import { gql } from "@apollo/client";

export const typeDef = gql`
	type CreditCard {
		pan: String!
		cardholder: String!
	}

	type PaymentData {
		paymentMethod: String!
		paymentDetails: CreditCard!
	}
`;

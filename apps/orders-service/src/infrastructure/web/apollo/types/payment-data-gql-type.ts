import { gql } from '@apollo/client';

export const typeDef = gql`
	type PaymentCreditCard {
		pan: String!
		cardholder: String!
	}

	type OrderPaymentData {
		paymentMethod: String!
		paymentDetails: PaymentCreditCard!
	}
`;

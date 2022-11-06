import { gql } from "@apollo/client";

export const typeDef = gql`
	type ClosedCartItemProduct {
		code: String!
		name: String!
		sizeCode: String!
		sizeName: String!
		price: Float!
		colorName: String!
		imageUrl: String!
	}

	type ClosedCartItem {
		id: ID!
		product: ClosedCartItemProduct!
		quantity: Int!
	}

	type CreditCard {
		pan: String!
		cardholder: String!
	}

	type PaymentData {
		paymentMethod: String!
		paymentDetails: CreditCard!
	}

	type ClosedCart {
		id: String!
		code: String!
		userId: String!
		items: [ClosedCartItem]!
		placedDate: BigInt!
		estimatedDeliveryDate: BigInt!
		totalUnits: Int!
		deliveryCost: Float
		totalAmount: Float!
		shippingAddress: ShippingAddress!
		paymentData: PaymentData!
	}
`;

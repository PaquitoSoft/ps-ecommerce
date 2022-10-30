import { gql } from "@apollo/client";

export const typeDef = gql`
	type OrderItemProduct {
		code: String!
		name: String!
		sizeCode: String!
		sizeName: String!
		price: Float!
		colorName: String!
		imageUrl: String!
	}

	type OrderItem {
		id: ID!
		product: OrderItemProduct!
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

	type Order {
		id: String!
		code: String!
		userId: String!
		items: [OrderItem]!
		placedDate: BigInt!
		estimatedDeliveryDate: BigInt!
		totalUnits: Int!
		deliveryCost: Float
		totalAmount: Float!
		shippingAddress: ShippingAddress!
		paymentData: PaymentData!
	}
`;

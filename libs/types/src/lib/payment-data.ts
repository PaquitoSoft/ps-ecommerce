export type CreditCard = {
	pan: string;
	cardholder: string;
	expirationDate?: string;
	cvv?: string;
}

type PaymentData = {
	paymentMethod: string;
	paymentDetails: CreditCard;
};

export default PaymentData;

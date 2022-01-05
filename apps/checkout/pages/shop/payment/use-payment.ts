import { useRouter } from "next/router";

import { useShopCart } from '@ps-ecommerce/shared-ui-components';

import { PaymentData } from "@ps-ecommerce/types";

function usePayment() {
	const router = useRouter();
	const { actions: { checkout } } = useShopCart();

	const onFormSubmit = async (paymentData: PaymentData) => {
		await checkout(paymentData);
		router.push("/shop/confirmation");
	};

	return {
		actions: {
			onFormSubmit
		}
	};

}

export default usePayment;

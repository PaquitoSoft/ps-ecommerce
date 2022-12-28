import { useRouter } from 'next/router';

import { useShopCart } from '@ps-ecommerce/shared-ui-components';

import { ShippingAddress } from '@ps-ecommerce/types';

function useDelivery() {
	const router = useRouter();
	const {
		actions: { saveShippingAddress },
	} = useShopCart();

	const onFormSubmit = async (shippingAddress: ShippingAddress) => {
		await saveShippingAddress(shippingAddress);
		router.push('/payment');
	};

	return {
		actions: {
			onFormSubmit,
		},
	};
}

export default useDelivery;

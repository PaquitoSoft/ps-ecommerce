import { useMemo, useState } from 'react';

import { Product, Size } from '@ps-ecommerce/types';

import { useShopCart, useWishlist } from '@ps-ecommerce/shared-ui-components';

function useProductDetailsPage(product: Product) {
	const [
		isAddToCartConfirmationModalOpen,
		setIsAddToCartConfirmationModalOpen,
	] = useState(false);
	const [addedSize, setAddedSize] = useState<Size>();
	const {
		state: { shopCart },
		actions: { addToCart },
	} = useShopCart();
	const {
		actions: { isProductInWishlist, handleProductSelection },
	} = useWishlist();

	const isWishlistedProduct = useMemo<boolean>(
		() => isProductInWishlist(product.id),
		[isProductInWishlist, product]
	);

	const handleAddToCart = async (product: Product, size: Size) => {
		await addToCart(product, size);
		setAddedSize(size);
		setIsAddToCartConfirmationModalOpen(true);
	};

	const handleAddToFavorites = (product: Product) => {
		handleProductSelection(product.id);
	};

	return {
		state: {
			isWishlistedProduct,
			isAddToCartConfirmationModalOpen,
			shopCart,
			addedSize,
		},
		actions: {
			addToCart: handleAddToCart,
			addToFavorites: handleAddToFavorites,
			closeAddToCartConfirmationModal: () =>
				setIsAddToCartConfirmationModalOpen(false),
		},
	};
}

export default useProductDetailsPage;

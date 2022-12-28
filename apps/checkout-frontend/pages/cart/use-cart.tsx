import { useShopCart, useWishlist } from '@ps-ecommerce/shared-ui-components';

import { ShopCartItem } from '@ps-ecommerce/types';

function useCart() {
	const {
		state: { shopCart },
		actions: { updateItemInCart, removeFromCart },
	} = useShopCart();
	const {
		actions: { isProductInWishlist, handleProductSelection },
	} = useWishlist();

	const onUpdateItem = (orderItem: ShopCartItem, quantity: number) => {
		updateItemInCart(orderItem.id, quantity);
	};
	const onRemoveItem = (orderItem: ShopCartItem) => {
		removeFromCart(orderItem.id);
	};
	const onWishlistSelectionUpdate = (orderItem: ShopCartItem) => {
		handleProductSelection(orderItem.product.id);
	};

	return {
		state: { shopCart },
		actions: {
			isShopCartItemInWishlist: isProductInWishlist,
			onUpdateItem,
			onRemoveItem,
			onWishlistSelectionUpdate,
		},
	};
}

export default useCart;

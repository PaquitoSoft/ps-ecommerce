import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { useWishlist } from '@ps-ecommerce/shared-ui-components';

import { Product } from '@ps-ecommerce/types';

function useProductsGrid({ totalProductsCount = 0, productsPerPage = 1 }) {
	const { query } = useRouter();
	const {
		actions: { isProductInWishlist, handleProductSelection },
	} = useWishlist();
	const pageNumber = +query.page! || 1;
	const categoryCode = query.code! as string;
	const totalPagesCount = Math.trunc(totalProductsCount / productsPerPage);

	const updateProductInWishlist = useCallback(
		(product: Product) => {
			handleProductSelection(product.id);
		},
		[handleProductSelection]
	);

	return {
		state: {
			pageNumber,
			categoryCode,
			totalPagesCount,
		},
		actions: {
			isProductInWishlist,
			updateProductInWishlist,
		},
	};
}

export default useProductsGrid;

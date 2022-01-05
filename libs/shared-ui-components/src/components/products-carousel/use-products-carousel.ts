import { RefObject, useCallback, useEffect, useState } from "react";

import useWishlist from '@hooks/use-wishlist';

import { Product } from "@ps-ecommerce/types";

import { MoveDirection } from "./products-carousel";

function useProductsCarousel(
	{ productsContainerRef, movementStepSize }:
	{ productsContainerRef: RefObject<HTMLElement>, movementStepSize: number }
) {
	const [horizontalPosition, setHorizontalPosition] = useState(0);
	const [edges, setEdges] = useState({
		start: true,
		end: productsContainerRef.current?.clientWidth === productsContainerRef.current?.scrollWidth
	});
	const {
		actions: {
			isProductInWishlist,
			handleProductSelection
		}
	} = useWishlist();

	useEffect(() => {
		productsContainerRef.current?.scroll({ left: horizontalPosition, behavior: 'smooth' });
		setEdges({
			start: horizontalPosition === 0,
			end: (productsContainerRef.current?.clientWidth || 0) + horizontalPosition >= (productsContainerRef.current?.scrollWidth || 0)
		});
	}, [productsContainerRef, horizontalPosition]);

	const moveCarousel = (direction: MoveDirection) => {
		setHorizontalPosition(prev => {
			const movementSize = (direction === 'right') ? movementStepSize : (-1 * movementStepSize);
			return Math.max(0, prev + movementSize);
		});
	};

	const updateProductInWishlist = useCallback((product: Product) => {
		handleProductSelection(product.id);
	}, [handleProductSelection]);

	return {
		state: {
			edges
		},
		actions: {
			moveCarousel,
			isProductInWishlist,
			updateProductInWishlist
		}
	}
}

export default useProductsCarousel;

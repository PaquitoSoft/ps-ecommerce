import { GetServerSideProps } from 'next/types';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import cx from 'classnames';

import { createApolloClient, webUtils } from '@ps-ecommerce/shared-server';

import { SectionTitle, Button, utilStyles } from '@ps-ecommerce/design-system';

import ShopCartItemComponent from './shop-cart-item/shop-cart-item';

import {
	ShopCartTotals,
	ShopCartFragment,
} from '@ps-ecommerce/shared-ui-components';
import useCart from './use-cart';

import styles from './cart.module.css';

const ShopCartPageDataQuery = gql`
	${ShopCartFragment}
	query ShopCartPageDataQuery(
		$categoryCode: String!
		$count: Int
		$randomValues: Boolean
	) {
		shopCart {
			...ShopCartFields
		}
		productsByCategory(
			categoryCode: $categoryCode
			count: $count
			randomValues: $randomValues
		) {
			products {
				id
				code
				name
				altName
				gridImages
				price
			}
		}
	}
`;

const relatedProductsQueryVariables = {
	categoryCode: 'top_sellers',
	count: 8,
	randomValues: true,
};

function CheckoutButton({
	className,
	isFullWidth = false,
}: {
	className?: string;
	isFullWidth?: boolean;
}) {
	const router = useRouter();

	return (
		<Button
			className={className}
			isFullWidth={isFullWidth}
			onClick={() => router.push('/delivery')}
			testId="checkout-button"
		>
			CHECKOUT
		</Button>
	);
}

function EmptyCart() {
	const router = useRouter();
	return (
		<div>
			<SectionTitle as="h1" size="large">
				Your bag is empty
			</SectionTitle>
			<p className={styles.shopCartSubtitle}>
				Once you add something to your bag - it will appear here. Ready
				to get started?
			</p>
			<Button
				className={utilStyles.marginTop_15}
				onClick={() => router.push('/')}
			>
				Get started
			</Button>
		</div>
	);
}

function ShopCartPage() {
	const {
		actions: {
			onUpdateItem,
			onRemoveItem,
			isShopCartItemInWishlist,
			onWishlistSelectionUpdate,
		},
		state: { shopCart },
	} = useCart();
	// const { data: { productsByCategory: { products: topSellerProducts} } } = useQuery(ShopCartPageDataQuery, {
	// 	variables: relatedProductsQueryVariables
	// });

	if (shopCart.items.length < 1) {
		return (
			<div className={styles.shopCartPage}>
				<EmptyCart />
			</div>
		);
	}

	return (
		<div className={styles.shopCartPage}>
			<section className={styles.shopCartContents}>
				<SectionTitle as="h1">Your bag</SectionTitle>
				<div className={styles.shopCartSubtitle}>
					TOTAL ({shopCart.totalUnits} items){' '}
					<span className={styles.shopCartTotalAmount}>
						{shopCart.totalAmount} €
					</span>
				</div>
				<ul className={styles.shopCartItems}>
					{shopCart.items.map((item) => (
						<li
							key={item.id}
							className={utilStyles.marginBottom_40}
						>
							<ShopCartItemComponent
								item={item}
								onUpdateItem={onUpdateItem}
								onRemoveItem={onRemoveItem}
								isInWishlist={isShopCartItemInWishlist(
									item.product.id
								)}
								onWishlistSelectionUpdate={
									onWishlistSelectionUpdate
								}
							/>
						</li>
					))}
				</ul>
				<CheckoutButton />
				{/* <section className={utilStyles.marginTop_60}>
					<ProductsCarousel
						products={topSellerProducts}
						title="TOP SELLERS"
						imageSize={255}
					/>
				</section> */}
			</section>
			<section className={styles.shopCartTotals}>
				<CheckoutButton
					className={cx(
						utilStyles.marginTop_40,
						utilStyles.marginBottom_40
					)}
					isFullWidth
				/>
				<ShopCartTotals shopCart={shopCart} />
			</section>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = webUtils.extractUserId(context.req, context.query);

	const apolloClient = createApolloClient({
		endpointUrl: process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL,
		context: { userId },
	});

	await apolloClient.query({
		query: ShopCartPageDataQuery,
		variables: relatedProductsQueryVariables,
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
	};
};

export default ShopCartPage;

import { Breadcrumb, ShopCart } from '@ps-ecommerce/types';

import { TwoLayoutMainContent } from '@ps-ecommerce/design-system';

import ShopLayoutHeader from './shop-layout-header/shop-layout-header';
import ShopCartTotals from './shop-cart-totals/shop-cart-totals';
import ShopCartItemsSummary from './shop-cart-items-summary/shop-cart-items-summary';
import ShopLayoutFooter from './shop-layout-footer/shop-layout-footer';
import ShopCartDeliverySummary from './shop-cart-delivery-summary/shop-cart-delivery-summary';

import styles from './shop-layout.module.css';

type Props = {
	shopCart?: ShopCart;
	selectedBreadcrumb?: Breadcrumb;
	sidebarContent?: React.ReactNode;
	children: React.ReactNode;
};

function ShopLayout({
	shopCart,
	selectedBreadcrumb,
	sidebarContent,
	children
}: Props) {
	return (
		<div className={styles.shopLayout}>
			<ShopLayoutHeader
				className={styles.shopLayoutHeaderContainer}
				selectedBreadcrumb={selectedBreadcrumb}
			/>
			<main>
				<TwoLayoutMainContent className={styles.shopLayoutMainContent}>
					<div className={styles.shopLayoutPageContent}>
						{children}
					</div>
					{
						!!sidebarContent &&
						(
							<div className={styles.shopLayoutSidebar}>
								{sidebarContent}
							</div>
						)
					}
					{
						!sidebarContent && shopCart && (
							<div className={styles.shopLayoutSidebar}>
								<ShopCartTotals shopCart={shopCart} />
								<hr className={styles.shopLayoutSeparator} />
								<ShopCartItemsSummary shopCart={shopCart} />
								{
									selectedBreadcrumb === Breadcrumb.PAYMENT &&
									<>
										<hr className={styles.shopLayoutShippingSeparator} />
										<ShopCartDeliverySummary shippingAddress={shopCart.shippingAddress!} />
									</>
								}
							</div>
						)
					}
				</TwoLayoutMainContent>
			</main>
			<ShopLayoutFooter className={styles.shopLayoutFooter} />
		</div>
	);
}

export default ShopLayout;

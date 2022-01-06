import cx from 'classnames';

import useShopCart from '../../../../../hooks/use-shop-cart';
import useWishlist from '../../../../../hooks/use-wishlist';

import { Badge, ProfileIcon, FavoriteIcon, MiniCartIcon } from '@ps-ecommerce/design-system';

import styles from './header-actions.module.css';

function HeaderActions() {
	const { state: { wishlist } } = useWishlist();
	const { state: { shopCart } } = useShopCart();

	const isWishlistEmpty = !wishlist?.products || wishlist?.products.length === 0;

	return (
		<div className="header-actions">
			<a
				href="/profile"
				className={styles.headerActions__item}
				title="Access your profile information"
				data-test-id="profile-link"
			>
				<ProfileIcon/>
			</a>

			<a
				href="/wishlist"
				className={styles.headerActions__item}
				title="Take a look at your wishlist">
				<FavoriteIcon className={cx({
					[styles.headerActions__favoritesActive]: !isWishlistEmpty
				})} />
				{
					!isWishlistEmpty &&
					<Badge className={styles.headerActions__cartItemsCount} value={wishlist?.products.length || 0} />
				}
			</a>
			<a
				href="/shop/cart"
				className={styles.headerActions__item}
				title="Go to the shopping cart"
			>
				<MiniCartIcon />
				{
					shopCart.totalUnits > 0 &&
					<Badge className={styles.headerActions__cartItemsCount} value={shopCart.totalUnits} />
				}
			</a>
		</div>
	);
}

export default HeaderActions;

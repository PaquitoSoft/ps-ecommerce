import cx from 'classnames';
import { useRouter } from 'next/router';

import {
	Button,
	Divider,
	Modal,
	SectionTitle,
} from '@ps-ecommerce/design-system';

import { ProductImage } from '@ps-ecommerce/shared-ui-components';

import { Product, Size, ShopCart } from '@ps-ecommerce/types';

import styles from './add-to-cart-confirmation-modal.module.css';
import utilStyles from '@ds/utilities.module.css';

type Props = {
	addedProduct: Product;
	addedSize: Size;
	shopCart: ShopCart;
	onClose: () => void;
};

function AddToCartConfirmationModal({ addedProduct, addedSize, shopCart, onClose }: Props) {
	const router = useRouter();

	return (
		<Modal
			title="Successfully added to cart!"
			size="medium"
			onClose={onClose}
		>
			<div className={styles.addToCartConfirmationModal}>
				<div className={styles.modalProductInfoSection}>
					<div className={styles.modalProductInfoImage}>
						<ProductImage
							imageUrl={addedProduct.detailImages[0]}
							alt={addedProduct.altName}
						/>
					</div>
					<div className={styles.modalProductInfoData}>
						<h2 className={styles.modalProductName}>{addedProduct.name}</h2>
						<div className={styles.modalProductPrice}>{addedProduct.price} €</div>
						<div className={utilStyles.marginTop_05}>
							{
								addedProduct.colors?.length > 0 &&
								<p>Color: {addedProduct.colors[0].name}</p>
							}
							<p>Size: {addedSize.name}</p>
							<p>Quantity: 1</p>
						</div>
					</div>
				</div>
				<div className={styles.modalShopCartInfoSection}>
					<SectionTitle as="h3" size="small">Your cart</SectionTitle>
					<div className={utilStyles.marginTop_15}>
						<p>{shopCart.totalUnits} items</p>
						<p className={styles.modalShopCartTotalRow}>
							<span>Total Product Cost:</span>
							<span>{shopCart.totalAmount}</span>
						</p>
						<p className={styles.modalShopCartTotalRow}>
							<span>Total Delivery Cost:</span>
							<span>FREE</span>
						</p>
						<Divider size="small" />
						<p className={cx(styles.modalShopCartTotalAmount, styles.modalShopCartTotalRow)}>
							<span>Total:</span>
							<span>{shopCart.totalAmount} €</span>
						</p>
					</div>
					<div className={utilStyles.marginTop_15}>
						<Button
							className={utilStyles.marginBottom_10}
							isFullWidth
							onClick={() => router.push('/shop/cart')}
							testId="go-to-shop-cart-button"
						>View Bag</Button>
						<Button
							kind="secondary"
							isFullWidth
							onClick={() => router.push('/shop/delivery')}
							testId="go-to-delivery-button"
						>Checkout</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default AddToCartConfirmationModal;

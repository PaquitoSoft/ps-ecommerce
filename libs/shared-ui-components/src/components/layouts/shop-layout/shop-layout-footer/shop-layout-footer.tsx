import Link from 'next/link';
import cx from 'classnames';

import styles from './shop-layout-footer.module.css';

type Props = {
	className?: string;
};

function ShopLayoutFooter({ className }: Props) {
	return (
		<footer className={cx(styles.shopLayoutFooter, className)}>
			<div>
				<ul className={styles.shopLayoutFooterLinks}>
					<li className={styles.shopLayoutFooterLink}>
						<Link href="#">
							<a>Cookie Settings</a>
						</Link>
					</li>
					<li className={styles.shopLayoutFooterLink}>
						<Link href="#">
							<a>Data settings</a>
						</Link>
					</li>
					<li className={styles.shopLayoutFooterLink}>
						<Link href="#">
							<a>Privacy Statement</a>
						</Link>
					</li>
					<li className={styles.shopLayoutFooterLink}>
						<Link href="#">
							<a>Terms and Conditions</a>
						</Link>
					</li>
					<li className={styles.shopLayoutFooterLink}>
						<Link href="#">
							<a>Imprint</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className={styles.shopLayoutFooterCopyright}>© 2021 asidras Limited</div>
		</footer>
	);
}

export default ShopLayoutFooter;

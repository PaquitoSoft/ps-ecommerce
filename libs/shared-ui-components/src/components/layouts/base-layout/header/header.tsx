import Link from 'next/link';

import { Category } from '@ps-ecommerce/types';

import HeaderCategories from './header-categories/header-categories';
import HeaderActions from './header-actions/header-actions';

import styles from './header.module.css';

type Props = {
	categories: Category[];
}

function Header({ categories }: Props) {
	return (
		<header className={styles.appHeader}>
			<div className="app-header__logo">
				<Link href="/">
					<a>
						<img
							src="/images/icon-adidas-logo.svg"
							alt="Adidas logo"
							width={70}
						/>
					</a>
				</Link>
			</div>
			<div className={styles.appHeader__categories}>
				<HeaderCategories categories={categories} />
			</div>
			<div className={styles.appHeader__actions}>
				<HeaderActions />
			</div>
		</header>
	);
}

export default Header;

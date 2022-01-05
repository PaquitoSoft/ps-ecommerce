import Link from 'next/link';
import cx from 'classnames';

import { Breadcrumb } from '@ps-ecommerce/types';

import { Badge, PhoneIcon } from '@ps-ecommerce/design-system';

import styles from './shop-layout-header.module.css';

type Props = {
	className?: string;
	selectedBreadcrumb?: Breadcrumb;
};

function BreadcrumbItem(
	{ breadcrumb, index, isSelected = false, isDisabled = false }:
	{ breadcrumb: Breadcrumb, index: number, isSelected: boolean, isDisabled: boolean }
) {
	return (
		<li className={cx(
			styles.breadcrumbItem,
			{ [styles.breadcrumbItem_selected]: isSelected },
			{ [styles.breadcrumbItem_disabled]: isDisabled}
		)}>
			<Link href={`/shop/${breadcrumb.toLocaleLowerCase()}`}>
				<a className={styles.breadcrumbItemLink}>
					<Badge className={styles.breadcrumbIndex} value={index + 1} />
					<span>{breadcrumb}</span>
				</a>
			</Link>
		</li>
	);
}

function ShopLayoutHeader({ className, selectedBreadcrumb }: Props) {
	const breadcrumbs = Object.values(Breadcrumb);
	const selectedBreadcrumbIndex = breadcrumbs.findIndex(breadcrumb => breadcrumb === selectedBreadcrumb);
	return (
		<header className={cx(styles.shopLayoutHeader, className)}>
			<div className={styles.headerTop}>
				<Link href="/">
					<a>
						<img
							src="/images/icon-adidas-logo.svg"
							alt="Adidas logo"
							width={70}
						/>
					</a>
				</Link>
				<div className={styles.headerInfo}>
					<p>
						<PhoneIcon className={styles.headerPhoneIcon} />
						<span>QUESTIONS?</span>
						<span className={styles.headerInfoPhone}>+44 20 7465 7315</span>
					</p>
					<p>
						<span>Mon to Fri: 8am - 10pm</span>
						<span>Sat - Sun: 9am - 9pm</span>
					</p>
				</div>
			</div>
			<div className={styles.headerBreadcrumbs_BAK}>
				<ol className={styles.headerBreadcrumbs}>
					{
						breadcrumbs.map((breadcrumb, index) => (
							<BreadcrumbItem
								key={breadcrumb}
								breadcrumb={breadcrumb}
								index={index}
								isSelected={selectedBreadcrumb === breadcrumb}
								isDisabled={
									index > selectedBreadcrumbIndex ||
									(
										selectedBreadcrumb === Breadcrumb.CONFIRMATION &&
										breadcrumb !== Breadcrumb.CONFIRMATION
									)
								}
							/>
						))
					}
				</ol>
			</div>
		</header>
	);
}

export default ShopLayoutHeader;

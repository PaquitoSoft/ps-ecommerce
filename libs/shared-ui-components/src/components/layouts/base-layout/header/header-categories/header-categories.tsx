import { Category } from '@ps-ecommerce/types';

import LinksGrid from '../../../../links-grid/links-grid';

import styles from './header-categories.module.css';

type Props = {
	categories: Category[];
}

function HeaderCategories({ categories }: Props) {
	return (
		<ul className={styles.headerCategories}>
			{categories.map(category => {
				const linksData = category.subcategories.map(subcategory => ({
					title: subcategory.name,
					links: subcategory.subcategories.map((subcat: Category) => ({
						name: subcat.name,
						href: `/products-grid/${subcat.code}`
					}))
				}));
				return (
					<li
						key={category.id}
						className={styles.headerCategories__rootItem}
					>
						<div className={styles.headerCategories__rootItemTitle}>{category.name}</div>
						<div
							key={category.id}
							className={styles.headerCategories__categoriesPanel}>
							<LinksGrid
								linksData={linksData}
								centered
							/>
						</div>
					</li>
				)
			})}
		</ul>
	);
}

export default HeaderCategories;

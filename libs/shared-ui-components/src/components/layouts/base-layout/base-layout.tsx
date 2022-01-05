import { gql, useQuery } from '@apollo/client';

import { LinksList, Category } from '@ps-ecommerce/types';

import Header from './header/header';
import Footer from './footer/footer';

import styles from './base-layout.module.css';

type LayoutData = {
	categoriesTree: Category[];
	footerLinks: LinksList[];
}

type Props = {
	children: React.ReactNode;
};

const LayoutDataQuery = gql`
	query LayoutData {
		categoriesTree {
			id
			code
			name
			subcategories {
				id
				code
				name
				subcategories {
					id
					code
					name
				}
			}
		}
		footerLinks {
			title
			links {
				name
				href
			}
		}
	}
`;

function BaseLayout({ children }: Props) {
	const {
		// error,
		// loading,
		data,
	} = useQuery<LayoutData>(LayoutDataQuery);

	return (
		<div className={styles.baseLayout}>
			<Header categories={data?.categoriesTree || []}/>
			<section className={styles.baseLayoutMainContent}>
				{children}
			</section>
			<Footer linksData={data?.footerLinks || []} />
		</div>
	);
}

export default BaseLayout;

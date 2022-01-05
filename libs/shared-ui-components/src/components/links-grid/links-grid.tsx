import Link from 'next/link';
import cx from 'classnames';

import { LinksList } from '@ps-ecommerce/types';

import styles from './links-grid.module.css';

type Props = {
	linksData: LinksList[];
	centered?: boolean;
};

function LinksGrid({ centered = false, linksData }: Props) {
	return (
		<section className={cx(styles.linksGrid, { [styles.linksGridCentered]: centered })}>
			{linksData.map(data => (
				<div key={data.title} data-test-id="links-grid">
					<h3 className={styles.linksGrid__sectionTitle}>{data.title}</h3>
					<ul>
						{data.links.map(linkData => (
							<li
								key={linkData.name}
								className={styles.linksGrid__sectionLink}
							>
								<Link href={linkData.href}>
									<a className={styles.linksGrid__link} data-test-id="links-grid-link">{linkData.name}</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
}

export default LinksGrid;

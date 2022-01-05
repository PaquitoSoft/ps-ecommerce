import cx from 'classnames';
import Link from 'next/link';

import { SectionTitle, utilStyles } from '@ps-ecommerce/design-system';

import styles from './help-links-list.module.css';

type Props = {
	title: string;
	titleSize?: 'tiny' | 'small' | 'medium' | 'large';
	links: {
		href: string;
		text: string;
	}[];
	className?: string;
};

function HelpLinksList({ title, titleSize = 'medium', links, className }: Props) {
	return (
		<section className={cx(styles.helpLinksList, className)}>
			<SectionTitle
				className={utilStyles.marginBottom_15}
				as="h2"
				size={titleSize}
			>{title}</SectionTitle>

			<ul className={styles.helpLinksList}>
				{links.map((link, index) => (
					<li key={`help-list-link_${index}`} className={utilStyles.marginBottom_10}>
						<Link href={link.href}>
							<a className={styles.helpLinksListLink}>{link.text}</a>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}

export default HelpLinksList;

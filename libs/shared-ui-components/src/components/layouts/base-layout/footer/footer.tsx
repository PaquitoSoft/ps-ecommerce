import LinksGrid from '../../../links-grid/links-grid';

import { LinksList } from "@ps-ecommerce/types";

import styles from './footer.module.css';

type Props = {
	linksData?: LinksList[];
};

function Footer({ linksData = [] }: Props) {
	return (
		<footer className={styles.appFooter} data-test-id="base-layout-footer">
			<LinksGrid linksData={linksData} />
		</footer>
	)
}

export default Footer;

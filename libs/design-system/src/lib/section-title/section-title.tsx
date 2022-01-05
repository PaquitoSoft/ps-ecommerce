import cx from 'classnames';

import styles from './section-title.module.css';

type Props = {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	size?: 'tiny' | 'small' | 'medium' | 'large';
	children: React.ReactNode;
	className?: string;
}

export function SectionTitle({ as = 'h2', size = 'medium', className, children }: Props) {
	const Component = as;
	return (
		<Component className={cx(styles.sectionTitle, styles[`sectionTitle_${size}`], className)}>{children}</Component>
	);
}

export default SectionTitle;

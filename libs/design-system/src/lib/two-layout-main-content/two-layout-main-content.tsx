import cx from 'classnames';

import styles from './two-layout-main-content.module.css';

type Props = {
	className?: string;
	children: React.ReactNode;
};

export function TwoLayoutMainContent({ className, children }: Props) {
	return (
		<div className={cx(styles.twoLayoutMainContent, className)}>
			{children}
		</div>
	)
}

export default TwoLayoutMainContent;

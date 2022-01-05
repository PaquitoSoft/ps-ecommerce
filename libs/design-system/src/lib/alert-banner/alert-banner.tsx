import cx from 'classnames';

import styles from './alert-banner.module.css';

type Props = {
	type?: 'warning' | 'error' | 'info';
	children: React.ReactNode
	className?: string;
};

export function AlertBanner({ type = 'info', children, className }: Props) {
	return (
		<div className={cx(styles.alertBanner, styles[`alertBanner__${type}`], className)}>
			<div className={styles.alertBannerContent}>{children}</div>
		</div>
	)
}

export default AlertBanner;

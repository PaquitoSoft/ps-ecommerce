import cx from 'classnames';

import CheckmarkCircleIcon from '../iconography/checkmark-circle-icon';

import styles from './message-banner.module.css';

type Props = {
	type?: 'success' | 'error';
	className?: string;
	children: React.ReactNode;
};

export function MessageBanner({ type = 'success', className, children }: Props) {
	return (
		<div className={cx(styles.messageBanner, styles[`messageBanner_${type}`], className)}>
			<CheckmarkCircleIcon className={styles.messageBannerIcon} />
			<p>{children}</p>
		</div>
	);
}

export default MessageBanner;

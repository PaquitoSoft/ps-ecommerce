import cx from 'classnames';

import styles from './badge.module.css';

type Props = {
	value: number;
	className?: string;
}

export function Badge({ value, className }: Props) {
	return (
		<span className={cx(styles.badge, className)}>{value}</span>
	);
}

export default Badge;

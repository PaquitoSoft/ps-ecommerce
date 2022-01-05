import cx from 'classnames';

import styles from './divider.module.css';

type Props = {
	className?: string;
	size?: 'small' | 'medium' | 'large';
};

export function Divider({ className, size = 'medium' }: Props) {
	return (
		<div className={cx(styles.divider, styles[`dividerSize_${size}`], className)} />
	);
}

export default Divider;

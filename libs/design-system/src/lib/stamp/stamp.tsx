import cx from 'classnames';

import styles from './stamp.module.css';

type Props = {
	children: React.ReactNode;
	className?: string;
}

export function Stamp({ children, className }: Props) {
	return (
		<div className={cx(styles.stamp, className)}>{children}</div>
	);
}

export default Stamp;

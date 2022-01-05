import cx from 'classnames';

import styles from './icon-button.module.css';

type Props = {
	className?: string;
	size?: 'small' | 'medium' | 'large';
	isDisabled?: boolean;
	onClick(): void;
	children: React.ReactNode;
};

export function IconButton({ className, size = 'medium', isDisabled = false, onClick, children }: Props) {
	return (
		<button
			className={cx(styles.iconButton, styles[`iconButtonSize_${size}`], className)}
			disabled={isDisabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default IconButton;

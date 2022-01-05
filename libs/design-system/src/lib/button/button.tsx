import cx from 'classnames';

import ArrowIcon from '../iconography/arrow-right-icon';

import styles from './button.module.css';

type Props = {
	className?: string;
	isDisabled?: boolean;
	onClick?(): void;
	children: React.ReactNode;
	isFullWidth?: boolean;
	type?: 'submit' | 'reset' | 'button';
	kind?: 'primary' | 'secondary';
	testId?: string;
}

export function Button({
	className,
	isDisabled = false,
	children,
	onClick,
	isFullWidth = false,
	type = 'button',
	kind = 'primary',
	testId = ''
}: Props) {
	return (
		<button
			className={cx(
				styles.buttonContainer,
				className,
				{ [styles.buttonFullWidth]: isFullWidth }
			)}
			disabled={isDisabled}
			onClick={onClick}
			type={type}
			data-test-id={testId}
		>
			{
				kind === 'primary' &&
				<div className={styles.fakeButton}>&nbsp;</div>
			}
			<div className={cx(styles.button, styles[`buttonKind_${kind}`])}>
				<div>{children}</div>
				<ArrowIcon className={styles.buttonIcon} />
			</div>
		</button>
	);
}

export default Button;

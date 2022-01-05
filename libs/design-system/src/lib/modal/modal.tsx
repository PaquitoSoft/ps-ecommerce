import cx from 'classnames';

import CloseIcon from '../iconography/close-icon';
import SectionTitle from '../section-title/section-title';
import IconButton from '../icon-button/icon-button';

import styles from './modal.module.css';

type Props = {
	title?: string;
	onClose?: () => void;
	size?: 'small' | 'medium' | 'large';
	children: React.ReactNode;
};

export function Modal({
	title,
	onClose = () => false,
	size = 'medium',
	children
}: Props) {
	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalVeil} onClick={onClose}></div>
			<dialog className={cx(styles.modalDialog, styles[`modalDialogSize_${size}`])} open>
				{
					!!title &&
					<SectionTitle>{title}</SectionTitle>
				}
				<IconButton className={styles.modalCloseButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
				<div className={styles.modalContent}>
					{children}
				</div>
			</dialog>
		</div>
	);
}

export default Modal;

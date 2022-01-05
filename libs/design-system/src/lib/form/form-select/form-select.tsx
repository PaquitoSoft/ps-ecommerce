import cx from 'classnames';

import styles from './form-select.module.css';

type Props = {
	value: any;
	onChange: (value: string) => void;
	className?: string;
	children: React.ReactNode;
}

export function FormSelect({ value, className, onChange, children }: Props) {
	return (
		<select className={cx(styles.formSelect, className)} value={value} onChange={(event) => onChange(event.target.value)}>
			{children}
		</select>
	);
}

export default FormSelect;

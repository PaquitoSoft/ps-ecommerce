import cx from 'classnames';

import CheckmarkIcon from '@icons/checkmark-icon';
import CrossIcon from '@icons/cross-icon';

import styles from './form-text-field.module.css';

export function FormTextField({
	field,
	props,
	label,
	form,
	...rest
}: any) {
	const isValid = form.touched[field.name] && !form.errors[field.name];
	const showError = form.touched[field.name] && form.errors[field.name];

	return (
		<div className={styles.formTextField}>
			<input
				id={field.name}
				className={cx(
					styles.formTextFieldInput,
					{ [styles.formTextFieldInput_invalid]: showError },
					{ [styles.formTextFieldInput_valid]: isValid },
				)}
				type={rest.type}
				{...field}
				{...rest}
			/>
			<label
				className={cx(styles.formTextFieldLabel, { [styles.formTextFieldLabel_active]: field.value })}
				htmlFor={field.name}
			>{label}</label>
			{
				showError &&
				<>
					<div className={styles.formTextFieldErrorMsg}>{form.errors[field.name]}</div>
					<CrossIcon className={cx(styles.formTextFieldIcon, styles.formTextFieldErrorIcon)} />
				</>

			}
			{
				isValid &&
				<CheckmarkIcon className={cx(styles.formTextFieldIcon, styles.formTextFieldSuccessIcon)} />
			}
		</div>
	);
}

export default FormTextField;

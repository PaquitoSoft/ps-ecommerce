import cx from 'classnames';
import { Field, Form, Formik } from 'formik';

import { validations } from '@ps-ecommerce/shared-ui-logic'

import { FormTextField, Button } from '@ps-ecommerce/design-system';

import { PaymentData } from '@ps-ecommerce/types';

import styles from './payment-selection-form.module.css';

type Props = {
	className?: string;
	paymentData?: PaymentData;
	onSubmit(paymentData: PaymentData): void;
}

const expirationDateValidation = (value: string) => {
	return /^\d{2}\/\d{2}$/.test(value) ? undefined : 'You need to follow the format MM/YY';
};

function PaymentSelectionForm({ className, paymentData, onSubmit }: Props) {
	const _onSubmit = (formValues: any) => {
		onSubmit({
			paymentMethod: 'credit-card',
			paymentDetails: {
				...formValues
				// pan: formValues.pan,
				// cardholder: formValues.cardholder,
				// expirationDate: formValues.expirationDate,
				// cvv: formValues.cvv
			}
		});
	};

	return (
		<section className={cx(styles.paymentSelectionForm, className)}>
			<h2 className={styles.paymentSelectionFormTitle}>CREDIT/DEBIT CARD</h2>
			<Formik initialValues={paymentData || {}} onSubmit={_onSubmit}>
				{({ isSubmitting, isValidating }) => (
					<Form>
						<Field
							name="pan"
							component={FormTextField}
							validate={validations.validate(validations.fixedLength(16))}
							label="Card number"
						/>
						<Field
							name="cardholder"
							component={FormTextField}
							validate={validations.validate(validations.required)}
							label="Name on card"
						/>
						<Field
							name="expirationDate"
							component={FormTextField}
							validate={validations.validate(expirationDateValidation)}
							label="Expiration date (MM/YY)"
						/>
						<Field
							name="cvv"
							component={FormTextField}
							validate={validations.validate(validations.fixedLength(3))}
							maxLength={3}
							label="CVV"
						/>

						<Button
							type="submit"
							isDisabled={isSubmitting || isValidating}
							className={styles.paymentSelectionFormSubmit}
							testId="place-order-button"
						>PLACE ORDER</Button>
					</Form>
				)}
			</Formik>
			<p className={styles.paymentSelectionFormTerms}>By clicking Place Order you agree to the <a className={styles.paymentSelectionFormTermsLink} href="#">Terms & Conditions</a> and <a className={styles.paymentSelectionFormTermsLink} href="#">Delivery Terms</a>.</p>
		</section>
	);
}

export default PaymentSelectionForm;

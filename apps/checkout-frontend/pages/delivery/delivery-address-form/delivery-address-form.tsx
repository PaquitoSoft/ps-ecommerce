import { Field, Form, Formik } from 'formik';

import { validations } from '@ps-ecommerce/shared-ui-logic';
import { FormTextField, Button, utilStyles } from '@ps-ecommerce/design-system';

import { ShippingAddress } from '@ps-ecommerce/types';

type Props = {
	shippingAddress?: ShippingAddress;
	onSubmit: (shippingAddress: ShippingAddress) => void;
};

function DeliveryAddressForm({ shippingAddress, onSubmit }: Props) {
	const _onSubmit = (formValues: any) => {
		onSubmit({
			email: formValues.email,
			name: formValues.name,
			surname: formValues.surname,
			addressLine: formValues.addressLine,
			postalCode: formValues.postalCode,
			city: formValues.city,
		});
	};
	return (
		<Formik initialValues={shippingAddress || {}} onSubmit={_onSubmit}>
			{({ isSubmitting, isValidating }) => (
				<Form>
					<Field
						name="email"
						component={FormTextField}
						validate={validations.validate(validations.email)}
						label="Email"
					/>
					<Field
						name="name"
						component={FormTextField}
						validate={validations.validate(validations.required)}
						label="First name"
					/>
					<Field
						name="surname"
						component={FormTextField}
						validate={validations.validate(validations.required)}
						label="Surname"
					/>
					<Field
						name="addressLine"
						component={FormTextField}
						validate={validations.validate(validations.required)}
						label="Address"
					/>
					<Field
						name="postalCode"
						component={FormTextField}
						validate={validations.validate([
							validations.onlyNumbers,
							validations.fixedLength(5),
						])}
						label="Postal Code"
					/>
					<Field name="city" component={FormTextField} label="City" />

					<Button
						type="submit"
						isDisabled={isSubmitting || isValidating}
						className={utilStyles.marginTop_40}
						testId="save-shipping-button"
					>
						REVIEW & PAY
					</Button>
				</Form>
			)}
		</Formik>
	);
}

export default DeliveryAddressForm;

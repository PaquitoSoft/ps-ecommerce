type Validator = (value: string) => string | undefined;

export function required(value: string): string | undefined {
	return !value || value.trim().length < 1 ? 'Required field' : undefined;
}

export function email(value: string): string | undefined {
	return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined;
}

export function onlyNumbers(value: string): string | undefined {
	return !/[0-9+]/.test(value) ? 'You must use only numbers' : undefined;
}

export function fixedLength(length: number): Validator {
	return (value: string): string | undefined => {
		return !value || value.trim().length !== length
			? `Must be ${length} characters long`
			: undefined;
	};
}

export function validate(validators: Validator | Validator[]): Validator {
	const _validators = Array.isArray(validators) ? validators : [validators];
	return (value: string): string | undefined => {
		for (const validator of _validators) {
			const error = validator(value);
			if (error) {
				return error;
			}
		}
		return undefined; // just to please typescript
	};
}

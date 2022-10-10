import { checkoutBackend } from './checkout-backend';

describe('checkoutBackend', () => {
	it('should work', () => {
		expect(checkoutBackend()).toEqual('checkout-backend');
	});
});

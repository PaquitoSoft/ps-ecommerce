import { customerBackend } from './customer-backend';

describe('customerBackend', () => {
	it('should work', () => {
		expect(customerBackend()).toEqual('customer-backend');
	});
});

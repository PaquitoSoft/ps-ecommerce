// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

const {
	CHECKOUT_URL,
	CUSTOMER_URL
} = process.env;

/**
* @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
**/
const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false
	},
	poweredByHeader: false,
	pageExtensions: ['page.tsx', 'route.ts', 'mid.ts'],
	images: {
		domains: ['assets.adidas.com']
	},
	rewrites: () => [
		{
			source: '/:path*',
			destination: '/:path*'
		},
		{
			source: '/shop',
			destination: `${CHECKOUT_URL}/shop`
		},
		{
			source: '/shop/:path*',
			destination: `${CHECKOUT_URL}/shop/:path*`
		},
		{
			source: '/profile',
			destination: `${CUSTOMER_URL}/profile`
		},
		{
			source: '/profile/:path*',
			destination: `${CUSTOMER_URL}/profile/:path*`
		}
	]
};

module.exports = withNx(nextConfig);

/* eslint-disable */
export default {
	displayName: 'catalog-frontend',
	preset: '../../jest.preset.js',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
		'^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/apps/catalog-frontend',
};
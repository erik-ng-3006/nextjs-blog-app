/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const nextConfig = (phase) => {
	//for dev
	if ((phase = PHASE_DEVELOPMENT_SERVER)) {
		return {
			reactStrictMode: true,
			swcMinify: true,
			images: {
				domains: ['source.unsplash.com'],
			},
			env: {
				mongodb_username: 'admin123',
				mongodb_password: 'PHqNbNmI9AhlrIIW',
				mongodb_cluster: 'cluster0',
			},
		};
	}
	return {
		reactStrictMode: true,
		swcMinify: true,
		images: {
			domains: ['source.unsplash.com'],
		},
		env: {
			mongodb_username: 'admin123',
			mongodb_password: 'PHqNbNmI9AhlrIIW',
			mongodb_cluster: 'cluster0',
		},
	};
};

module.exports = nextConfig;

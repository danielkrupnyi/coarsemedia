import withPlaiceholder from '@plaiceholder/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media2.dev.to',
				port: '',
			},
		],
	},
	experimental: {
		turbo: {},
	},
};

export default withPlaiceholder(nextConfig);

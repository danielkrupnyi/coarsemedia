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
};

export default withPlaiceholder(nextConfig);

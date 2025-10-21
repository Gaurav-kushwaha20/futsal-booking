import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ['localhost', 'lh3.googleusercontent.com'],
	},
	//  remotePatterns for more control
	remotePatterns: [
		{
			protocol: 'https',
			hostname: 'lh3.googleusercontent.com',
			pathname: '/a/**',
		},
	],
};

export default nextConfig;

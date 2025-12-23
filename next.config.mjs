/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.c-monetiquette.fr'
            },
            {
                protocol: 'https',
                hostname: 'mcstaging.c-monetiquette.fr'
            }
        ]
    },
    experimental: {
        optimizePackageImports: ['embla-carousel-react']
    },
    turbopack: {},
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // Vendor chunk pour React et Next.js
                    framework: {
                        name: 'framework',
                        test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
                        priority: 40,
                        enforce: true
                    },
                    // Chunk séparé pour embla-carousel
                    carousel: {
                        name: 'carousel',
                        test: /[\\/]node_modules[\\/]embla-carousel/,
                        priority: 30,
                        reuseExistingChunk: true
                    },
                    // Commons chunk pour le code partagé
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: 20
                    }
                }
            };
        }
        return config;
    }
};

export default nextConfig;

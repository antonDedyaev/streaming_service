/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'thumbs.dfs.ivi.ru',
            },
        ],
    },
};

module.exports = nextConfig;

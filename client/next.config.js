const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                //hostname: 'thumbs.dfs.ivi.ru',
            },
        ],
    },
    i18n,
};

module.exports = nextConfig;

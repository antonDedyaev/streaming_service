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
    redirects: async () => {
        return [
            {
                source: '/collections', // source path /home
                destination: '/movies', // destination path
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;

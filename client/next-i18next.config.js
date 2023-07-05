const path = require('path');

module.exports = {
    i18n: {
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
        localeDetection: false,
    },
    localePath: path.resolve('./public/locales'),
};

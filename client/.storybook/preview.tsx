import type { Preview } from '@storybook/react';
import type { StoryFn } from '@storybook/react';
import i18n from './i18n';
import { Provider } from 'react-redux';
import { setupStore } from '../src/store/store';
import React from 'react';

const store = setupStore();

export const decorators = [
    (Story: StoryFn) => (
        <Provider store={store}>
            <Story />
        </Provider>
    ),
];

export const parameters = {
    i18n,
    locale: 'ru',
    locales: {
        ru: 'Русский',
        en: 'English',
    },
};

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;

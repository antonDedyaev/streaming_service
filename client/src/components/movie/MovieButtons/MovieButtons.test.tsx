import { render, screen } from '@testing-library/react';
import MovieButtons from './MovieButtons';

jest.mock('next-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            asPath: '/',
        };
    },
}));

describe('MOVIEBUTTONS SNAPSHOTS TESTS', () => {
    test('MovieButtons should not be changed', () => {
        render(<MovieButtons />);

        const div = screen.getByTestId('buttons');
        expect(div).toMatchSnapshot();
    });
});

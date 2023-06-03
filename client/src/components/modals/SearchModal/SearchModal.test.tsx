import { render, screen } from '@testing-library/react';
import SearchModal from './SearchModal';

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

describe('SEARCHMODAL SNAPSHOTS TESTS', () => {
    test('SearchModal should not be changed', () => {
        render(<SearchModal />);

        const more = screen.getByTestId('searchModal');
        expect(more).toMatchSnapshot();
    });
});

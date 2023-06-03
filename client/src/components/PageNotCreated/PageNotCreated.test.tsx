import { render, screen } from '@testing-library/react';
import PageNotCreated from './PageNotCreated';

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
            pathname: '',
        };
    },
}));

describe('PAGENOTCREATED SNAPSHOTS TESTS', () => {
    test('PageNotCreated should not be changed', () => {
        render(<PageNotCreated />);

        const id = screen.getByTestId('pageNotCreated');
        expect(id).toMatchSnapshot();
    });
});

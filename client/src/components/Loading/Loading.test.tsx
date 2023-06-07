import { render, screen } from '@testing-library/react';
import Loading from './Loading';

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

describe('LOADING SNAPSHOTS TESTS', () => {
    test('Loading should not be changed', () => {
        render(<Loading />);

        const id = screen.getByTestId('loading');
        expect(id).toMatchSnapshot();
    });
});

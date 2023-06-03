import { render, screen } from '@testing-library/react';
import Header from './Header';
import * as reduxHooks from '../../../store/hooks/redux';

jest.mock('../../../store/hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const genres = [{ id: 1, name: 'Жанр', enName: 'Genre' }];

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
            pathname: '',
            asPath: '/',
        };
    },
}));

describe('HEADER SNAPSHOTS TESTS', () => {
    test('Header should not be changed', () => {
        mockedSelector.mockReturnValue({ genres });
        render(<Header page="home" />);

        const header = screen.getByTestId('header');
        expect(header).toMatchSnapshot();
    });
});

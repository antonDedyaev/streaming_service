import { render, screen } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import * as reduxHooks from '../../store/hooks/redux';

jest.mock('../../store/hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const genres = [{ id: 1, name: 'Жанр', enName: 'Genre' }];
const countries = [{ id: 1, name: 'Страна', enName: 'Country' }];

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

describe('BREADCRUMBS SNAPSHOTS TESTS', () => {
    test('"type" slash Breadcrumbs should not be changed', () => {
        mockedSelector.mockReturnValue({ genres, countries });
        render(<Breadcrumbs path={['movie', '10']} type="slash" />);

        const div = screen.getByTestId('breadcrumbs');
        expect(div).toMatchSnapshot();
    });

    test('"type" point Breadcrumbs should not be changed', () => {
        mockedSelector.mockReturnValue({ genres, countries });
        render(
            <Breadcrumbs
                path={['movie', '14']}
                genre={{ id: 11, name: 'Жанр', enName: 'Genre' }}
                tailName={{ name: 'Название', enName: 'Name' }}
                type="point"
            />,
        );

        const div = screen.getByTestId('breadcrumbs');
        expect(div).toMatchSnapshot();
    });

    test('"type" pointShort Breadcrumbs should not be changed', () => {
        mockedSelector.mockReturnValue({ genres, countries });
        render(
            <Breadcrumbs
                path={['movie', '13']}
                genre={{ id: 12, name: 'Жанр', enName: 'Genre' }}
                tailName={{ name: 'Название', enName: 'Name' }}
                type="pointShort"
            />,
        );

        const div = screen.getByTestId('breadcrumbs');
        expect(div).toMatchSnapshot();
    });
});

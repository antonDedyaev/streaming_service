import { render, screen } from '@testing-library/react';
import SortMovies from './SortMovies';
import { moviesTest } from '../../../testAsserts/testItems';
import * as reduxHooks from '../../../store/hooks/redux';

jest.mock('../../../store/hooks/redux');
const useDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockDispatch = jest.fn();

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

describe('SORTMOVIES SNAPSHOTS TESTS', () => {
    test('SortMovies should not be changed', () => {
        useDispatch.mockReturnValue(mockDispatch);
        render(<SortMovies filteredMovies={moviesTest} />);

        const sort = screen.getByTestId('sortMovies');
        expect(sort).toMatchSnapshot();
    });
});

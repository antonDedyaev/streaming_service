import { render, screen } from '@testing-library/react';
import FilterSearch from './FilterSearch';
import * as reduxHooks from '../../../store/hooks/redux';
import { actorSuggestions } from '../../../testAsserts/testItems';

jest.mock('../../../store/hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const useDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockDispatch = jest.fn();
const filters = {
    genres: [],
    countries: [],
    ratingKp: 0,
    votesKp: 0,
    director: '',
    actor: '',
};

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

describe('FILTERSEARCH SNAPSHOTS TESTS', () => {
    test('"category" director FilterSearch should not be changed', () => {
        mockedSelector.mockReturnValue(filters);
        useDispatch.mockReturnValue(mockDispatch);
        render(<FilterSearch category="director" suggestionsList={actorSuggestions} />);

        const div = screen.getByTestId('filterSearch');
        expect(div).toMatchSnapshot();
    });

    test('"category" actor FilterSearch should not be changed', () => {
        mockedSelector.mockReturnValue(filters);
        useDispatch.mockReturnValue(mockDispatch);
        render(<FilterSearch category="actor" suggestionsList={actorSuggestions} />);

        const div = screen.getByTestId('filterSearch');
        expect(div).toMatchSnapshot();
    });
});

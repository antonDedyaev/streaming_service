import { render, screen } from '@testing-library/react';
import FilterRange from './FilterRange';
import * as reduxHooks from '../../../store/hooks/redux';
import ratingIcon from '@/../public/icons/rating.svg';
import votesIcon from '../../../public/icons/userRank.svg';

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

describe('FILTERRANGE SNAPSHOTS TESTS', () => {
    test('"category" ratingKp FilterRange should not be changed', () => {
        mockedSelector.mockReturnValue(filters);
        useDispatch.mockReturnValue(mockDispatch);
        render(<FilterRange category="ratingKp" image={ratingIcon} limit={5} step={1} />);

        const div = screen.getByTestId('filterRange');
        expect(div).toMatchSnapshot();
    });

    test('"category" votesKp FilterRange should not be changed', () => {
        mockedSelector.mockReturnValue(filters);
        useDispatch.mockReturnValue(mockDispatch);
        render(<FilterRange category="votesKp" image={votesIcon} limit={5} step={1} />);

        const div = screen.getByTestId('filterRange');
        expect(div).toMatchSnapshot();
    });
});

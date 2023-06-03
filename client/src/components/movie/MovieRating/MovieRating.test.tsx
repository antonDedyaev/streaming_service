import { render, screen } from '@testing-library/react';
import MovieRating from './MovieRating';
import { movieTest } from '../../../testAsserts/testItems';

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

describe('MOVIERATING SNAPSHOTS TESTS', () => {
    test('MovieRating should not be changed', () => {
        render(<MovieRating movie={movieTest} />);

        const div = screen.getByTestId('movieRating');
        expect(div).toMatchSnapshot();
    });
});

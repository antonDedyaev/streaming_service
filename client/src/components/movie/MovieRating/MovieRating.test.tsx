import { render, screen } from '@testing-library/react';
import MovieRating from './MovieRating';
import { movies } from '../../squareCard/SquareCardsList/Temp/Movie.data';

describe('MOVIERATING SNAPSHOTS TESTS', () => {
    test('MovieRating should not be changed', () => {
        render(<MovieRating movie={movies[0]} />);

        const div = screen.getByRole('div-rating');
        expect(div).toMatchSnapshot();
    });
});

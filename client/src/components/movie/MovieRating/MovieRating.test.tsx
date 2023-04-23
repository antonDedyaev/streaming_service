import { render, screen } from '@testing-library/react';
import MovieRating from './MovieRating';
import { movies } from '../movieMedallion/MovieMedallionsList/Temp/Movie.data';

describe('MOVIERATING SNAPSHOTS TESTS', () => {
    test('MovieRating should not be changed', () => {
        render(<MovieRating movie={movies[0]} />);

        const button = screen.getByRole('button');
        expect(button).toMatchSnapshot();
    });
});

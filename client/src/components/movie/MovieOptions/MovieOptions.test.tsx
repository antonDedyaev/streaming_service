import { render, screen } from '@testing-library/react';
import MovieOptions from './MovieOptions';
import { movies } from '../movieMedallion/MovieMedallionsList/Temp/Movie.data';

describe('MOVIEOPTIONS SNAPSHOTS TESTS', () => {
    test('MovieOptions should not be changed', () => {
        render(<MovieOptions movie={movies[0]} />);

        const div = screen.getByRole('div-options');
        expect(div).toMatchSnapshot();
    });
});

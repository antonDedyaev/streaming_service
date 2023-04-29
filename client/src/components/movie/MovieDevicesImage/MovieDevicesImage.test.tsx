import { render, screen } from '@testing-library/react';
import MovieDevicesImage from './MovieDevicesImage';
import { movies } from '../movieMedallion/MovieMedallionsList/Temp/Movie.data';

describe('MOVIEDEVICESIMAGE SNAPSHOTS TESTS', () => {
    test('MovieDevicesImage should not be changed', () => {
        render(<MovieDevicesImage movie={movies[0]} />);

        const div = screen.getByTestId('div-movieDevicesImage');
        expect(div).toMatchSnapshot();
    });
});

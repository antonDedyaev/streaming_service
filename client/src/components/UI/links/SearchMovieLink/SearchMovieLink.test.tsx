import { render, screen } from '@testing-library/react';
import SearchMovieLink from './SearchMovieLink';

describe('SEARCHMOVIELINK SNAPSHOTS TESTS', () => {
    test('SearchMovieLink should not be changed', () => {
        render(<SearchMovieLink href="/" name="text" year={1900} value="" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});

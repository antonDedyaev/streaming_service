import { render, screen } from '@testing-library/react';
import RatingPoster from './RatingPoster';
import { ratingMovieTest } from '../../../testAsserts/testItems';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '',
        };
    },
}));

describe('RATINGPOSTER SNAPSHOTS TESTS', () => {
    test('RatingPoster should not be changed', () => {
        render(<RatingPoster movie={ratingMovieTest} className="ratingItem" />);

        const id = screen.getByTestId('ratingPoster');
        expect(id).toMatchSnapshot();
    });
});

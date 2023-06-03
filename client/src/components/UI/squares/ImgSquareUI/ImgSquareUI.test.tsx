import { render, screen } from '@testing-library/react';
import ImgSquareUI from './ImgSquareUI';
import { directorSuggestions } from '../../../../testAsserts/testItems';

describe('IMGSQUAREUI SNAPSHOTS TESTS', () => {
    test('border small ImgSquareUI should not be changed', () => {
        render(<ImgSquareUI person={directorSuggestions[0]} />);

        const img = screen.getByRole('img');
        expect(img).toMatchSnapshot();
    });

    test('border medium ImgSquareUI should not be changed', () => {
        render(<ImgSquareUI person={directorSuggestions[0]} border="medium" />);

        const img = screen.getByRole('img');
        expect(img).toMatchSnapshot();
    });
});

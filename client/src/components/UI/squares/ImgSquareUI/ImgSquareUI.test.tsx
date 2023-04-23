import { render, screen } from '@testing-library/react';
import ImgSquareUI from './ImgSquareUI';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';

describe('IMGSQUAREUI SNAPSHOTS TESTS', () => {
    test('border small ImgSquareUI should not be changed', () => {
        render(<ImgSquareUI actor={actors[0]} />);

        const img = screen.getByRole('img');
        expect(img).toMatchSnapshot();
    });

    test('border medium ImgSquareUI should not be changed', () => {
        render(<ImgSquareUI actor={actors[0]} border="medium" />);

        const img = screen.getByRole('img');
        expect(img).toMatchSnapshot();
    });
});

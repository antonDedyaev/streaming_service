import { render, screen } from '@testing-library/react';
import TextSquareUI from './TextSquareUI';

describe('TEXTSQUAREUI SNAPSHOTS TESTS', () => {
    test('high small TextSquareUI should not be changed', () => {
        render(<TextSquareUI value={9.5} />);

        const div = screen.getByTestId('div-text');
        expect(div).toMatchSnapshot();
    });

    test('no high medium TextSquareUI should not be changed', () => {
        render(<TextSquareUI value={6.5} />);

        const div = screen.getByTestId('div-text');
        expect(div).toMatchSnapshot();
    });
});

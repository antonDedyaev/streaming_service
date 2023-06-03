import { render, screen } from '@testing-library/react';
import BorderedButton from './BorderedButton';

describe('BORDEREDBUTTON SNAPSHOTS TESTS', () => {
    test('size="large" BorderedButton should not be changed', () => {
        render(<BorderedButton className="button" size="large" children="Text" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });

    test('size="medium" BorderedButton should not be changed', () => {
        render(<BorderedButton className="button" size="medium" children="Text" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });

    test('size="small" BorderedButton should not be changed', () => {
        render(<BorderedButton className="button" size="small" children="Text" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });
});

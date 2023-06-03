import { render, screen } from '@testing-library/react';
import ColoredButton from './ColoredButton';

describe('COLOREDBUTTON SNAPSHOTS TESTS', () => {
    test('size="large" and color="red" ColoredButton should not be changed', () => {
        render(<ColoredButton className="button" size="large" children="Text" color="red" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });

    test('size="medium" and color="gray" ColoredButton should not be changed', () => {
        render(<ColoredButton className="button" size="medium" children="Text" color="gray" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });

    test('size="small" and color="lightGray" ColoredButton should not be changed', () => {
        render(<ColoredButton className="button" size="small" children="Text" color="lightGray" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });
});

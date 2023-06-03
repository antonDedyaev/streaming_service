import { render, screen } from '@testing-library/react';
import TransparentButton from './TransparentButton';

describe('TRANSPARENTBUTTON SNAPSHOTS TESTS', () => {
    test('textColor="bright" TransparentButton should not be changed', () => {
        render(<TransparentButton className="button" textColor="bright" children="Text" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });

    test('textColor="faded" TransparentButton should not be changed', () => {
        render(<TransparentButton className="button" textColor="faded" children="Text" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });
});

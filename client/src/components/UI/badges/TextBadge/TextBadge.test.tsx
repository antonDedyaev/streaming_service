import { render, screen } from '@testing-library/react';
import TextBadge from './TextBadge';

describe('TEXTBADGE SNAPSHOTS TESTS', () => {
    test('TextBadge should not be changed', () => {
        render(<TextBadge text="text" />);

        const id = screen.getByTestId('textBadge');
        expect(id).toMatchSnapshot();
    });
});

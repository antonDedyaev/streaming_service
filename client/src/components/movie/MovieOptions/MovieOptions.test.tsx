import { render, screen } from '@testing-library/react';
import MovieOptions from './MovieOptions';

describe('MOVIEOPTIONS SNAPSHOTS TESTS', () => {
    test('MovieOptions should not be changed', () => {
        render(<MovieOptions />);

        const div = screen.getByTestId('options');
        expect(div).toMatchSnapshot();
    });
});

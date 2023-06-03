import { render, screen } from '@testing-library/react';
import ArrowedLink from './ArrowedLink';

describe('ARROWEDLINK SNAPSHOTS TESTS', () => {
    test('ArrowedLink should not be changed', () => {
        render(<ArrowedLink href="/" text="text" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});

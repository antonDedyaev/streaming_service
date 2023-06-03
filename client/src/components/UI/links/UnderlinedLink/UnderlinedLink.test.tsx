import { render, screen } from '@testing-library/react';
import UnderlinedLink from './UnderlinedLink';

describe('UNDERLINEDLINK SNAPSHOTS TESTS', () => {
    test('UnderlinedLink should not be changed', () => {
        render(<UnderlinedLink href="/" text="text" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});

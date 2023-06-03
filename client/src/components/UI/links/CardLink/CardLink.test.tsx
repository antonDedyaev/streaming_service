import { render, screen } from '@testing-library/react';
import CardLink from './CardLink';

describe('CARDLINK SNAPSHOTS TESTS', () => {
    test('CardLink should not be changed', () => {
        render(<CardLink href="/" children="text" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});

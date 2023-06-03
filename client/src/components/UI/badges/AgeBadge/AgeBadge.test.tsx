import { render, screen } from '@testing-library/react';
import AgeBadge from './AgeBadge';

describe('AGEBADGE SNAPSHOTS TESTS', () => {
    test('AgeBadge should not be changed', () => {
        render(<AgeBadge value="8" />);

        const id = screen.getByTestId('ageBadge');
        expect(id).toMatchSnapshot();
    });
});

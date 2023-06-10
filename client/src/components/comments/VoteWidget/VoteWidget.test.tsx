import { render, screen } from '@testing-library/react';
import VoteWidget from './VoteWidget';

describe('VOTEWIDGET SNAPSHOTS TESTS', () => {
    test('VoteWidget should not be changed', () => {
        render(<VoteWidget />);

        const id = screen.getByTestId('voteWidget');
        expect(id).toMatchSnapshot();
    });
});

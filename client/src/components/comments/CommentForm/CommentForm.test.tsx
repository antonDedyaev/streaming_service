import { render, screen } from '@testing-library/react';
import CommentForm from './CommentForm';

import * as reduxHooks from '../../../store/hooks/redux';

jest.mock('../../../store/hooks/redux');
const useDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockDispatch = jest.fn();

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            asPath: '/',
            pathname: '',
        };
    },
}));

describe('COMMENTFORM SNAPSHOTS TESTS', () => {
    test('CommentForm should not be changed', () => {
        useDispatch.mockReturnValue(mockDispatch);
        render(<CommentForm onSubmit={() => false} />);

        const id = screen.getByTestId('commentForm');
        expect(id).toMatchSnapshot();
    });
});

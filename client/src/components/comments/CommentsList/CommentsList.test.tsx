import { render, screen } from '@testing-library/react';
import CommentsList from './CommentsList';
import { commentsTest } from '../../../testAsserts/testItems';

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

describe('COMMENTSLIST SNAPSHOTS TESTS', () => {
    test('CommentsList should not be changed', () => {
        useDispatch.mockReturnValue(mockDispatch);
        render(<CommentsList comments={commentsTest} />);

        const id = screen.getByTestId('commentsList');
        expect(id).toMatchSnapshot();
    });
});

import { render, screen } from '@testing-library/react';
import CommentItem from './CommentItem';
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

describe('COMMENTITEM SNAPSHOTS TESTS', () => {
    test('CommentItem should not be changed', () => {
        useDispatch.mockReturnValue(mockDispatch);
        render(<CommentItem comment={commentsTest[0]} />);

        const id = screen.getByTestId('commentItem');
        expect(id).toMatchSnapshot();
    });
});

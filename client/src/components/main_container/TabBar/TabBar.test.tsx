import { render, screen } from '@testing-library/react';
import TabBar from './TabBar';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            asPath: '/?ivi_search',
            query: { keyword: 'ivi_search' },
        };
    },
}));

describe('TABBAR SNAPSHOTS TESTS', () => {
    test('TabBar should not be changed', () => {
        render(<TabBar />);

        const div = screen.getByTestId('tabBar');
        expect(div).toMatchSnapshot();
    });
});

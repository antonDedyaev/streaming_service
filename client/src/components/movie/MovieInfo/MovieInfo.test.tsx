import { render, screen } from '@testing-library/react';
import MovieInfo from './MovieInfo';
import { movieTest } from '../../../testAsserts/testItems';
import { act } from 'react-dom/test-utils';

jest.mock('next-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '',
        };
    },
}));

describe('MOVIEINFO SNAPSHOTS TESTS', () => {
    test('MovieInfo should not be changed', () => {
        act(() => {
            render(<MovieInfo movie={movieTest} />);
        });

        const div = screen.getByTestId('movieInfo');
        expect(div).toMatchSnapshot();
    });
});

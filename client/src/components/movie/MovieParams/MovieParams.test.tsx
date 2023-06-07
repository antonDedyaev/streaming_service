import { render, screen } from '@testing-library/react';
import MovieParams from './MovieParams';
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

describe('MOVIEPARAMS SNAPSHOTS TESTS', () => {
    test('MovieParams should not be changed', () => {
        act(() => {
            render(<MovieParams movie={movieTest} />);
        });

        const div = screen.getByTestId('params');
        expect(div).toMatchSnapshot();
    });
});

import { render, screen } from '@testing-library/react';
import MoviesSection from './MoviesSection';
import { moviesTest } from '../../../testAsserts/testItems';

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

describe('MOVIESSECTION SNAPSHOTS TESTS', () => {
    test('MoviesSection should not be changed', () => {
        render(<MoviesSection movies={moviesTest} title="title" href="/" />);

        const id = screen.getByTestId('moviesSection');
        expect(id).toMatchSnapshot();
    });
});

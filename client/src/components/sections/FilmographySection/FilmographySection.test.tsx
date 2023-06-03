import { render, screen } from '@testing-library/react';
import FilmographySection from './FilmographySection';
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

describe('FILMOGRAPHYSECTION SNAPSHOTS TESTS', () => {
    test('FilmographySection should not be changed', () => {
        render(<FilmographySection movies={moviesTest} />);

        const id = screen.getByTestId('filmographySection');
        expect(id).toMatchSnapshot();
    });
});

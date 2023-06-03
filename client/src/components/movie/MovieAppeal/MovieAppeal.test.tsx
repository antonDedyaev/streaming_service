import { render, screen } from '@testing-library/react';
import MovieAppeal from './MovieAppeal';

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

describe('MOVIEAPPEAL SNAPSHOTS TESTS', () => {
    test('MovieAppeal should not be changed', () => {
        render(<MovieAppeal title="title" />);

        const div = screen.getByTestId('movieAppeal');
        expect(div).toMatchSnapshot();
    });
});

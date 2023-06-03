import { render, screen } from '@testing-library/react';
import Footer from './Footer';

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

describe('FOOTER SNAPSHOTS TESTS', () => {
    test('Footer should not be changed', () => {
        render(<Footer />);

        const footer = screen.getByTestId('footer');
        expect(footer).toMatchSnapshot();
    });
});

import { render, screen } from '@testing-library/react';
import TopTenSection from './TopTenSection';
import { movieTest } from '../../../testAsserts/testItems';

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

describe('TOPTENSECTION SNAPSHOTS TESTS', () => {
    test('TopTenSection should not be changed', () => {
        render(<TopTenSection movies={[movieTest, movieTest]} />);

        const id = screen.getByTestId('topTenSection');
        expect(id).toMatchSnapshot();
    });
});

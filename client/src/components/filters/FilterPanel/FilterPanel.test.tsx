import { render, screen } from '@testing-library/react';
import FilterPanel from './FilterPanel';

jest.mock('../../../store/hooks/redux');
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

describe('FILTERPANEL SNAPSHOTS TESTS', () => {
    test('FilterPanel should not be changed', () => {
        render(<FilterPanel children="Фильтры" isFilterApplied={false} />);

        const section = screen.getByTestId('filterPanel');
        expect(section).toMatchSnapshot();
    });
});

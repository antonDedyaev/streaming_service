import { render, screen } from '@testing-library/react';
import PersonsSection from './PersonsSection';
import { actorSuggestions } from '../../../testAsserts/testItems';

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

describe('PERSONSSECTION SNAPSHOTS TESTS', () => {
    test('size large PersonsSection should not be changed', () => {
        render(<PersonsSection persons={actorSuggestions} size="large" />);

        const id = screen.getByTestId('personsSection');
        expect(id).toMatchSnapshot();
    });

    test('size small PersonsSection should not be changed', () => {
        render(<PersonsSection persons={actorSuggestions} size="small" />);

        const id = screen.getByTestId('personsSection');
        expect(id).toMatchSnapshot();
    });
});

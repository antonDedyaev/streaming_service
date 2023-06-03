import { render, screen } from '@testing-library/react';
import { actorSuggestions } from '../../../testAsserts/testItems';
import PersonItem from './PersonItem';

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

describe('PERSONITEM SNAPSHOTS TESTS', () => {
    test('large PersonItem should not be changed', () => {
        render(<PersonItem person={actorSuggestions[0]} size="large" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });

    test('medium PersonItem should not be changed', () => {
        render(<PersonItem person={actorSuggestions[0]} size="medium" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });

    test('small PersonItem should not be changed', () => {
        render(<PersonItem person={actorSuggestions[0]} size="small" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});

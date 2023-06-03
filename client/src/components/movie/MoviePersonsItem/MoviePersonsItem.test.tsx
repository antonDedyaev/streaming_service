import { render, screen } from '@testing-library/react';
import MoviePersonsItem from './MoviePersonsItem';
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

describe('MOVIEPERSONSITEM SNAPSHOTS TESTS', () => {
    test('MoviePersonsItem should not be changed', () => {
        render(<MoviePersonsItem persons={actorSuggestions} title="title" />);

        const div = screen.getByTestId('moviePersonsItem');
        expect(div).toMatchSnapshot();
    });
});

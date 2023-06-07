import { render, screen } from '@testing-library/react';
import MovieMedallionsList from './MovieMedallionsList';
import { movieTest } from '../../../../testAsserts/testItems';
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

describe('MOVIEMEDALLIONSLIST SNAPSHOTS TESTS', () => {
    test('MovieMedallionsList should not be changed', () => {
        act(() => {
            render(<MovieMedallionsList movie={movieTest} />);
        });

        const div = screen.getByTestId('movieMedallionsList');
        expect(div).toMatchSnapshot();
    });
});

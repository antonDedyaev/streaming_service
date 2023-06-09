import { render, screen } from '@testing-library/react';
import PromoPoster from './PromoPoster';
import { promoMovieTest } from '../../../testAsserts/testItems';
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

describe('PROMOPOSTER SNAPSHOTS TESTS', () => {
    test('PromoPoster should not be changed', () => {
        act(() => {
            render(<PromoPoster movie={promoMovieTest} className="promoItem" />);
        });

        const id = screen.getByTestId('promoPoster');
        expect(id).toMatchSnapshot();
    });
});

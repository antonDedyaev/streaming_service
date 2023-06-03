import { render, screen } from '@testing-library/react';
import MoreModal from './MoreModal';
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

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            asPath: '/',
        };
    },
}));

describe('MOREMODAL SNAPSHOTS TESTS', () => {
    test('MoreModal should not be changed', () => {
        render(<MoreModal movie={movieTest} />);

        const more = screen.getByTestId('moreModal');
        expect(more).toMatchSnapshot();
    });
});

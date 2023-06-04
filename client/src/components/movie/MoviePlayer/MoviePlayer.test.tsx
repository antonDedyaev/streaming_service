import { render, screen } from '@testing-library/react';
import MoviePlayer from './MoviePlayer';
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

describe('MOVIEPLAYER SNAPSHOTS TESTS', () => {
    test('MoviePlayer should not be changed', () => {
        act(() => {
            render(<MoviePlayer />);
        });

        const div = screen.getByTestId('moviePlayer');
        expect(div).toMatchSnapshot();
    });
});

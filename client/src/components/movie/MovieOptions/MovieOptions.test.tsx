import { render, screen } from '@testing-library/react';
import MovieOptions from './MovieOptions';
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

describe('MOVIEOPTIONS SNAPSHOTS TESTS', () => {
    test('MovieOptions should not be changed', () => {
        act(() => {
            render(<MovieOptions />);
        });

        const div = screen.getByTestId('options');
        expect(div).toMatchSnapshot();
    });
});

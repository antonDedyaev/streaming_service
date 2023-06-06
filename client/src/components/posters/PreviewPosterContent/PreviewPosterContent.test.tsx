import { render, screen } from '@testing-library/react';
import PreviewPosterContent from './PreviewPosterContent';
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
            pathname: '',
        };
    },
}));

describe('PREVIEWPOSTERCONTENT SNAPSHOTS TESTS', () => {
    test('PreviewPosterContent should not be changed', () => {
        render(<PreviewPosterContent movie={movieTest} />);

        const id = screen.getByTestId('previewPosterContent');
        expect(id).toMatchSnapshot();
    });
});

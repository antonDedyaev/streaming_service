import { render, screen } from '@testing-library/react';
import PreviewPosterContentBrief from './PreviewPosterContentBrief';
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

describe('PREVIEWPOSTERCONTENTBRIEF SNAPSHOTS TESTS', () => {
    test('PreviewPosterContentBrief should not be changed', () => {
        render(<PreviewPosterContentBrief movie={movieTest} />);

        const id = screen.getByTestId('previewPosterContentBrief');
        expect(id).toMatchSnapshot();
    });
});

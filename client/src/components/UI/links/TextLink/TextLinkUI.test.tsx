import { render, screen } from '@testing-library/react';
import TextLinkUI from './TextLinkUI';

describe('TEXTLINKUI SNAPSHOTS TESTS', () => {
    test('bright TEXTLINKUI should not be changed', () => {
        render(
            <TextLinkUI href="/" option="bright">
                Ссылка
            </TextLinkUI>,
        );
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });

    test('dim TEXTLINKUI should not be changed', () => {
        render(
            <TextLinkUI href="/" option="dim">
                Ссылка
            </TextLinkUI>,
        );
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });

    test('gradient TEXTLINKUI should not be changed', () => {
        render(
            <TextLinkUI href="/" option="gradient">
                Ссылка
            </TextLinkUI>,
        );
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});

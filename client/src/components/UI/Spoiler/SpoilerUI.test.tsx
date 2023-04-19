import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import SpoilerUI from './SpoilerUI';
import { singleParagraph, moviePlot } from './storiesTemplates';

describe('SpoilerUI TESTS', () => {
    test('ellipsed SpoilerUI should not be changed', () => {
        render(<SpoilerUI toggleButtonTexts={['Развернуть', 'Свернуть']}>{singleParagraph}</SpoilerUI>);
        const expandedList = screen.getByRole('spoiler-wrapper');

        expect(expandedList).toMatchSnapshot();
    });

    test('SpoilerUI should not be collapsed', () => {
        const spanTexts: [string, string] = ['Читать далее', 'Свернуть'];
        render(
            <SpoilerUI toggleButtonTexts={spanTexts} shownLines={3} truncateFormat="horizontal">
                {moviePlot}
            </SpoilerUI>,
        );

        const expandButton = screen.getByText(spanTexts[0]);
        fireEvent.click(expandButton);
        expect(expandButton).toHaveTextContent(spanTexts[1]);
    });
});

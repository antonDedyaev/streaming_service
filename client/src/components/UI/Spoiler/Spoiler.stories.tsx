import type { Meta, StoryObj } from '@storybook/react';
import SpoilerUI from './SpoilerUI';
import { singleParagraph, moviePlot } from './storiesTemplates';
import './SpoilerUI.module.scss';

const meta: Meta<typeof SpoilerUI> = {
    title: 'Spoiler/Spoiler',
    component: SpoilerUI,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export default meta;

type Story = StoryObj<typeof SpoilerUI>;

export const EllipsedSpoiler: Story = {
    args: {
        children: singleParagraph,
        toggleButtonTexts: ['Развернуть', 'Свернуть'],
        buttonTextColor: 'bright',
        shownLines: 1,
        truncateFormat: 'vertical',
    },
};

export const ClippedSpoiler: Story = {
    args: {
        children: moviePlot,
        toggleButtonTexts: ['Детали о сериале', 'Свернуть детали'],
        buttonTextColor: 'faded',
        truncateFormat: 'horizontal',
    },
};

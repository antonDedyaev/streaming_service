import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TabBar from './TabBar';
import './TabBar.module.scss';

const meta: Meta<typeof TabBar> = {
    title: 'TabBar/TabBar',
    component: TabBar,
};

export default meta;

type Story = StoryObj<typeof TabBar>;

export const PageTabBar: Story = {
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: 'ipad',
        },
    },
};

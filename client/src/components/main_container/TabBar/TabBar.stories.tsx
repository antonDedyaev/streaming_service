import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import tabBar from './TabBar';
import './TabBar.module.scss';

const meta: Meta<typeof tabBar> = {
    title: 'TabBar',
    component: tabBar,
};

export default meta;

type Story = StoryObj<typeof tabBar>;

export const TabBar: Story = {
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: 'ipad',
        },
    },
};

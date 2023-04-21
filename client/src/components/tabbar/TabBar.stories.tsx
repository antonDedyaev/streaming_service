import type { Meta, StoryObj } from '@storybook/react';
import TabBar from './TabBar';
import './TabBar.module.scss';

const meta: Meta<typeof TabBar> = {
    title: 'TabBar/TabBar',
    component: TabBar,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TabBar>;

export const PageTabBar: Story = {};

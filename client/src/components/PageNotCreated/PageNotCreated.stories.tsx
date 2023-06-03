import { Meta, StoryObj } from '@storybook/react';
import './PageNotCreated.module.scss';
import PageNot from './PageNotCreated';

const meta: Meta<typeof PageNot> = {
    title: 'Information/PageNotCreated',
    component: PageNot,
};

export default meta;

type Story = StoryObj<typeof PageNot>;

export const PageNotCreated: Story = {};

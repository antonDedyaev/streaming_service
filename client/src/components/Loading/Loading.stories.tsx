import { Meta, StoryObj } from '@storybook/react';
import './Loading.module.scss';
import Load from './Loading';

const meta: Meta<typeof Load> = {
    title: 'Information/Loading',
    component: Load,
};

export default meta;

type Story = StoryObj<typeof Load>;

export const Loading: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import TransparentButton from './TransparentButton';
import './TransparentButton.module.scss';

const meta: Meta<typeof TransparentButton> = {
    title: 'Button/TransparentButton',
    component: TransparentButton,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TransparentButton>;

export const Button: Story = {
    args: {
        children: 'Button',
    },
};

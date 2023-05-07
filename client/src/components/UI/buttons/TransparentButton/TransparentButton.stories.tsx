import type { Meta, StoryObj } from '@storybook/react';
import TransparentButton from './TransparentButton';
import './TransparentButton.module.scss';

const meta: Meta<typeof TransparentButton> = {
    title: 'Button/TransparentButton',
    component: TransparentButton,
    tags: ['autodocs'],
    argTypes: {
        textColor: {
            type: 'string',
            descriptrion: 'цвет шрифта',
            defaultValue: 'bright',
            options: ['bright', 'faded'],
        }
    },
};

export default meta;

type Story = StoryObj<typeof TransparentButton>;

export const BrightButton: Story = {
    args: {
        children: 'bright button',
        textColor: 'bright'
    },
};

export const FadedButton: Story = {
    args: {
        children: 'faded button',
        textColor: 'faded'
    },
};

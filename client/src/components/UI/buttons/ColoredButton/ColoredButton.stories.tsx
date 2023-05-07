import type { Meta, StoryObj } from '@storybook/react';
import ColoredButton from './ColoredButton';
import './ColoredButton.module.scss';

const meta: Meta<typeof ColoredButton> = {
    title: 'Button/ColoredButton',
    component: ColoredButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            type: 'string',
            descriptrion: 'Размер кнопки',
            defaultValue: 'medium',
            options: ['large', 'medium', 'small'],
        },
        color: {
            type: 'string',
            descriptrion: 'Цвет фона',
            defaultValue: 'red',
            options: ['red', 'gray', 'lightGray'],
        }
    },
};

export default meta;

type Story = StoryObj<typeof ColoredButton>;

export const LargeRedButton: Story = {
    args: {
        size: 'large',
        color: 'red',
        children: 'Button',
    },
};

export const MediumGrayButton: Story = {
    args: {
        size: 'medium',
        color: 'gray',
        children: 'Button',
    },
};

export const SmallLightGrayButton: Story = {
    args: {
        size: 'small',
        color: 'lightGray',
        children: 'Button',
    },
};

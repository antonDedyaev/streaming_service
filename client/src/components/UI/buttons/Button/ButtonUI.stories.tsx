import type { Meta, StoryObj } from '@storybook/react';
import ButtonUI from './ButtonUI';
import './ButtonUI.module.scss';

const meta: Meta<typeof ButtonUI> = {
    title: 'Button/Button',
    component: ButtonUI,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            type: 'string',
            descriptrion: 'Вариант размера внутренних отступов',
            defaultValue: 'medium',
            options: ['large', 'medium', 'small', 'square'],
            control: {
                type: 'radio',
            },
        },
        background: {
            type: 'string',
            descriptrion: 'Вариант заднего фона кнопки',
            defaultValue: 'lightRed',
            options: ['lightRed', 'gray'],
            control: {
                type: 'radio',
            },
        },
        children: {
            type: 'string',
            name: 'label',
            defaultValue: 'Кнопка',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ButtonUI>;

export const RedButton: Story = {
    args: {
        background: 'lightRed',
        variant: 'medium',
        children: 'Button',
    },
};

export const GrayButton: Story = {
    args: {
        background: 'gray',
        variant: 'medium',
        children: 'Button',
    },
};

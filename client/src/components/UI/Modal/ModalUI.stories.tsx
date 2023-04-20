import type { Meta, StoryObj } from '@storybook/react';
import ModalUI from './ModalUI';
import './ModalUI.module.scss';

const meta: Meta<typeof ModalUI> = {
    title: 'ModalUI',
    component: ModalUI,
    tags: ['autodocs'],
    argTypes: {
        children: {
            type: 'string',
            name: 'label',
            defaultValue: 'Я модалка',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ModalUI>;

export const RedButton: Story = {
    args: {
        children: 'Я модалка',
    },
};
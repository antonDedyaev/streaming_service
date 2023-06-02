import type { Meta, StoryObj } from '@storybook/react';
import ModalInputUI from './ModalInputUI';
import './ModalInputUI.module.scss';

const meta: Meta<typeof ModalInputUI> = {
    title: 'Input',
    component: ModalInputUI,
    tags: ['autodocs'],
    argTypes: {
        inputType: {
            control: false,
        },
    },
};

export default meta;

type Story = StoryObj<typeof ModalInputUI>;

export const Search: Story = {
    args: {
        type: 'search',
        inputType: 'text',
        placeholder: 'Input',
        value: 'Text',
    },
};

export const Email: Story = {
    args: {
        type: 'email',
        inputType: 'text',
        placeholder: 'Email',
        value: 'email@mail.ru',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        inputType: 'password',
        placeholder: 'Password',
        value: 'Text',
    },
};

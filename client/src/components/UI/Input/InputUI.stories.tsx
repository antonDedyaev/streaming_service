import type { Meta, StoryObj } from '@storybook/react';
import InputUI from './InputUI';
import './InputUI.module.scss';

const meta: Meta<typeof InputUI> = {
    title: 'Input',
    component: InputUI,
    tags: ['autodocs'],
    argTypes: {
        inputType: {
            control: false,
        },
    },
};

export default meta;

type Story = StoryObj<typeof InputUI>;

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

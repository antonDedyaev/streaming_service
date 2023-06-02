import type { Meta, StoryObj } from '@storybook/react';
import './EditForm.module.scss';
import EditForm from './EditForm';

const meta: Meta<typeof EditForm> = {
    title: 'EditForm/EditForm',
    component: EditForm,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export default meta;

type Story = StoryObj<typeof EditForm>;

export const MovieEditForm: Story = {
    args: {
        item: { id: 1, name: 'Хранители', enName: 'Watchmen' },
        deletable: true,
    },
};

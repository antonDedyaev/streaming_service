import { Meta, StoryObj } from '@storybook/react';
import './TextBadge.module.scss';
import Badge from './TextBadge';

const meta: Meta<typeof Badge> = {
    title: 'Badges/TextBadge',
    component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const TextBadge: Story = {
    args: {
        text: 'Текст',
    },
};

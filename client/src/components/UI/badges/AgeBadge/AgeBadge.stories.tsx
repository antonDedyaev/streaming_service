import { Meta, StoryObj } from '@storybook/react';
import './AgeBadge.module.scss';
import Badge from './AgeBadge';

const meta: Meta<typeof Badge> = {
    title: 'Badges/AgeBadge',
    component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const AgeBadge: Story = {
    args: {
        value: '8',
    },
};

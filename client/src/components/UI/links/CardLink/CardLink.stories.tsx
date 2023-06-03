import type { Meta, StoryObj } from '@storybook/react';
import Link from './CardLink';
import './CardLink.module.scss';

const meta: Meta<typeof Link> = {
    title: 'Links/CardLink',
    component: Link,
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const CardLink: Story = {
    args: {
        href: '',
        children: 'Посмотреть все',
    },
};

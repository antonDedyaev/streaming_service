import type { Meta, StoryObj } from '@storybook/react';
import CardLink from './CardLink';
import './CardLink.module.scss';

const meta: Meta<typeof CardLink> = {
    title: 'Links/CardLink',
    component: CardLink,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export default meta;

type Story = StoryObj<typeof CardLink>;

export const MoviesCardLink: Story = {
    args: {
        href: '',
        children: 'Посмотреть все',
    },
};

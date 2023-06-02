import type { Meta, StoryObj } from '@storybook/react';
import FooterСomponent from './Footer';
import './Footer.module.scss';

const meta: Meta<typeof FooterСomponent> = {
    title: 'Footer',
    component: FooterСomponent,
};

export default meta;

type Story = StoryObj<typeof FooterСomponent>;

export const Footer: Story = {};

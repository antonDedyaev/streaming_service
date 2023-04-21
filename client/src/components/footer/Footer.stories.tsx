import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';
import './Footer.module.scss';

const meta: Meta<typeof Footer> = {
    title: 'Footer/Footer',
    component: Footer,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const PageFooter: Story = {};

import { Meta, StoryObj } from '@storybook/react';
import './VoteWidget.module.scss';
import VoteWidget from './VoteWidget';

const meta: Meta<typeof VoteWidget> = {
    title: 'Badges/Vote',
    component: VoteWidget,
};

export default meta;

type Story = StoryObj<typeof VoteWidget>;

export const Vote: Story = {};

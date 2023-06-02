import type { Meta, StoryObj } from '@storybook/react';
import ArrowButtonUI from './ArrowButtonUI';
import './ArrowButtonUI.module.scss';

const meta: Meta<typeof ArrowButtonUI> = {
    title: 'Button/ArrowButton',
    component: ArrowButtonUI,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            type: 'string',
            defaultValue: 'right',
            options: ['right', 'left'],
            control: {
                type: 'radio',
            },
        },
        iconSize: {
            type: 'string',
            defaultValue: 'large',
            options: ['large', 'medium', 'small'],
            control: {
                type: 'radio',
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', height: '50px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ArrowButtonUI>;

export const RightButton: Story = {
    args: {
        direction: 'right',
        iconSize: 'medium',
    },
};

export const LeftButton: Story = {
    args: {
        direction: 'left',
        iconSize: 'medium',
    },
};

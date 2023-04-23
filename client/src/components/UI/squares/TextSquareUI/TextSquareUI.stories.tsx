import { Meta, StoryObj } from '@storybook/react';
import TextSquareUI from './TextSquareUI';
import './TextSquareUI.module.scss';

const meta: Meta<typeof TextSquareUI> = {
    title: 'Cards/TextSquare',
    component: TextSquareUI,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextSquareUI>;

export const ValueHigh: Story = {
    decorators: [
        (Story) => (
            <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        value: 9.5,
        textSize: 'medium',
    },
};

export const ValueNoHigh: Story = {
    decorators: [
        (Story) => (
            <div
                style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                }}
            >
                <Story />
            </div>
        ),
    ],
    args: {
        value: 6.5,
        textSize: 'medium',
    },
};

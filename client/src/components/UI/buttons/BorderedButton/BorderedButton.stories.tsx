import type { Meta, StoryObj } from '@storybook/react';
import BorderedButton from './BorderedButton';
import './BorderedButton.module.scss';

const meta: Meta<typeof BorderedButton> = {
    title: 'Button/BorderedButton',
    component: BorderedButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            type: 'string',
            descriptrion: 'Размер кнопки',
            defaultValue: 'medium',
            options: ['large', 'medium', 'small'],
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    background: '#100e19',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof BorderedButton>;

export const LargeButton: Story = {
    decorators: [
        (Story) => (
            <div style={{ width: '100px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        size: 'large',
        children: 'Button',
    },
};

export const MediumButton: Story = {
    args: {
        size: 'medium',
        children: 'Button',
    },
};

export const SmallButton: Story = {
    args: {
        size: 'small',
        children: 'Button',
    },
};

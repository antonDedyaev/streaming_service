import type { Meta, StoryObj } from '@storybook/react';
import TransparentButton from './TransparentButton';
import './TransparentButton.module.scss';

const meta: Meta<typeof TransparentButton> = {
    title: 'Button/TransparentButton',
    component: TransparentButton,
    tags: ['autodocs'],
    argTypes: {
        textColor: {
            type: 'string',
            descriptrion: 'цвет шрифта',
            defaultValue: 'bright',
            options: ['bright', 'faded'],
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
                    paddingLeft: '10px',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof TransparentButton>;

export const BrightButton: Story = {
    args: {
        children: 'bright button',
        textColor: 'bright',
    },
};

export const FadedButton: Story = {
    args: {
        children: 'faded button',
        textColor: 'faded',
    },
};

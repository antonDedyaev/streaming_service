import type { Meta, StoryObj } from '@storybook/react';
import ArrowButtonUI from './ArrowButtonUI'
import './ArrowButtonUI.module.scss'

const meta: Meta<typeof ArrowButtonUI> = {
    title: 'Button/ArrowButton',
    component: ArrowButtonUI,
    tags: ['autodoc'],
    argTypes: {
        diarection: {
            type: 'string',
            descriptrion: 'Направление стрелочки',
            defaultValue: 'right',
            options: ['top', 'right', 'bottom', 'left'],
            control: {
                type: 'radio'
            }
        },
        iconSize: {
            type: 'string',
            descriptrion: 'Размер иконки',
            defaultValue: 'medium',
            options: ['large', 'medium', 'small'],
            control: {
                type: 'radio'
            }
        }
    }
}

export default meta

type Story = StoryObj<typeof ArrowButtonUI>

export const RightButton: Story = {
    args: {
        diarection: 'right',
        iconSize: 'medium'
    },
}

export const LeftButton: Story = {
    args: {
        diarection: 'left',
        iconSize: 'medium'
    },
}
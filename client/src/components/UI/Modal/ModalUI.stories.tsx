import type { Meta, StoryObj } from '@storybook/react';
import ModalUI from './ModalUI';
import './ModalUI.module.scss';

const meta: Meta<typeof ModalUI> = {
    title: 'ModalUI',
    component: ModalUI,
};

export default meta;

type Story = StoryObj<typeof ModalUI>;

export const RedButton: Story = {
    decorators: [
        (Story) => (
            <div style={{ color: '#fff' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        children: 'Я модалка',
    },
};

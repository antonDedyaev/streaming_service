import { Meta, StoryObj } from '@storybook/react';
import ArrowedLink from './ArrowedLink';
import '../../../../styles/nullstyle.scss';
import '../../../../styles/globals.scss';
import './ArrowedLink.module.scss';

const meta: Meta<typeof ArrowedLink> = {
    title: 'Links/ArrowedLink',
    component: ArrowedLink,
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ArrowedLink>;

export const Arrowed: Story = {
    args: {
        text: 'Лучшие фильмы',
        href: ''
    }
};


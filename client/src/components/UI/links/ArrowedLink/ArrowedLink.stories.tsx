import { Meta, StoryObj } from '@storybook/react';
import Link from './ArrowedLink';
import './ArrowedLink.module.scss';

const meta: Meta<typeof Link> = {
    title: 'Links/ArrowedLink',
    component: Link,
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const ArrowedLink: Story = {
    args: {
        text: 'Ссылка',
        href: '',
    },
};

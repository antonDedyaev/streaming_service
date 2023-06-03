import { Meta, StoryObj } from '@storybook/react';
import Link from './UnderlinedLink';
import './UnderlinedLink.module.scss';

const meta: Meta<typeof Link> = {
    title: 'Links/UnderlinedLink',
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

export const UnderlinedLink: Story = {
    args: {
        text: 'Подчеркнутая ссылка',
    },
};

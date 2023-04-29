import { Meta, StoryObj } from '@storybook/react';
import UnderlinedLink from './UnderlinedLink';
import '../../../../styles/nullstyle.scss';
import '../../../../styles/globals.scss';
import './UnderlinedLink.module.scss';

const meta: Meta<typeof UnderlinedLink> = {
    title: 'Links/UnderlinedLink',
    component: UnderlinedLink,
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof UnderlinedLink>;

export const Underlined: Story = {
    args: {
        text: 'Актёры и создатели'
    }
};


import { Meta, StoryObj } from '@storybook/react';
import MovieOptions from './MovieOptions';
import './MovieOptions.module.scss';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta: Meta<typeof MovieOptions> = {
    title: 'Information/Options',
    component: MovieOptions,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            default: 'desktop',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof MovieOptions>;

export const FullScreen: Story = {};

export const MobileScreen: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};

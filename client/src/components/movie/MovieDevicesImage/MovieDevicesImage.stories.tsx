import { Meta, StoryObj } from '@storybook/react';
import MovieDevicesImage from './MovieDevicesImage';
import './MovieDevicesImage.module.scss';

const meta: Meta<typeof MovieDevicesImage> = {
    title: 'Cards/DevicesImage',
    component: MovieDevicesImage,
};

export default meta;

type Story = StoryObj<typeof MovieDevicesImage>;

export const DevicesImage: Story = {
    args: {
        poster: require('../../../testAsserts/img/BG554460.jpg'),
        title: 'poster',
    },
};

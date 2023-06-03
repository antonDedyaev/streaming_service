import { Meta, StoryObj } from '@storybook/react';
import Link from './SearchMovieLink';
import './SearchMovieLink.module.scss';

const meta: Meta<typeof Link> = {
    title: 'Links/SearchMovieLink',
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

export const SearchMovieLink: Story = {
    args: {
        href: '/',
        name: 'Фильм',
        year: 1900,
        value: '',
    },
};

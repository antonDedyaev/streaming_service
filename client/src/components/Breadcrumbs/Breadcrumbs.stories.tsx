import { Meta, StoryObj } from '@storybook/react';
import '../../styles/nullstyle.scss';
import '../../styles/globals.scss';
import './Breadcrumbs.module.scss';
import Breadcrumbs from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Links/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: false,
        },
    },
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', padding: '10px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Slash: Story = {
    args: {
        path: ['Фильмы', 'Жанр'],
    },
};

export const Point: Story = {
    args: {
        path: ['Фильмы', 'idMovie'],
        genre: { id: 1, name: 'Жанр', enName: 'Жанр' },
        tailName: { name: 'Название фильма', enName: 'Название фильма' },
        type: 'point',
    },
};

export const PointShort: Story = {
    args: {
        path: ['Фильмы', 'idMovie'],
        genre: { id: 1, name: 'Жанр', enName: 'Жанр' },
        tailName: { name: 'Название фильма', enName: 'Название фильма' },
        type: 'pointShort',
    },
};

import { Meta, StoryObj } from '@storybook/react';
import MovieParams from './MovieParams';
import './MovieParams.module.scss';
import IMovie from '@/models/IMovie';

const meta: Meta<typeof MovieParams> = {
    title: 'Information/Params',
    component: MovieParams,
};

export default meta;

type Story = StoryObj<typeof MovieParams>;

const data: IMovie = {
    id: 1,
    type: 'movie',
    name: 'Название',
    enName: 'Название',
    posterUrl: '/img/posterTest.jpg',
    posterPreviewURL: '/img/posterTest.jpg',
    year: 1900,
    description: '',
    shortDescription: '',
    ageRating: 0,
    ratingKp: 9.5,
    votesKp: 11111,
    movieLength: 126,
    genres: [
        { id: 1, name: 'Жанр', enName: 'Жанр' },
        { id: 2, name: 'Жанр', enName: 'Жанр' },
    ],
    countries: [{ id: 1, name: 'Страна', enName: 'Страна' }],
    persons: [],
    trailer: '',
    watchingWithMovie: [],
    comments: [],
};

export const Params: Story = {
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        movie: data,
    },
};

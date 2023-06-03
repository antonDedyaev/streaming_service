import { Meta, StoryObj } from '@storybook/react';
import './PreviewPoster.module.scss';
import Poster from './PreviewPoster';
import IMovies from '@/models/IMovies';

const meta: Meta<typeof Poster> = {
    title: 'Poster/PreviewPoster',
    component: Poster,
};

export default meta;

type Story = StoryObj<typeof Poster>;

const data: IMovies = {
    id: 1,
    name: 'Название',
    enName: 'Название',
    posterPreviewURL: require('../../../testAsserts/img/BG554460.jpg'),
    premiereRussia: '',
    hasIMAX: false,
    year: 1900,
    ageRating: 0,
    ratingKp: 9.5,
    votesKp: 11111,
    movieLength: 126,
    genres: [
        { id: 1, name: 'Жанр', enName: 'Жанр' },
        { id: 2, name: 'Жанр', enName: 'Жанр' },
    ],
    countries: [{ id: 1, name: 'Страна', enName: 'Страна' }],
};

export const PreviewPoster: Story = {
    args: {
        movie: data,
    },
};

import { Meta, StoryObj } from '@storybook/react';
import MovieRating from './MovieRating';
import './MovieRating.module.scss';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import IMovie from '@/models/IMovie';

const meta: Meta<typeof MovieRating> = {
    title: 'Information/Rating',
    component: MovieRating,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            default: 'desktop',
        },
    },
};

export default meta;

type Story = StoryObj<typeof MovieRating>;

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
    genres: [],
    countries: [],
    persons: [],
    trailer: '',
    watchingWithMovie: [],
    comments: [],
};

export const Rating: Story = {
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', width: '400px' }}>
                <div style={{ margin: '10px' }}>
                    <Story />
                </div>
            </div>
        ),
    ],
    args: {
        movie: data,
    },
};

import { Meta, StoryObj } from '@storybook/react';
import './RatingPoster.module.scss';
import Poster from './RatingPoster';
import IMovie from '@/models/IMovie';

const meta: Meta<typeof Poster> = {
    title: 'Poster/RatingPoster',
    component: Poster,
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '1000px',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Poster>;

interface IRatingMovie extends IMovie {
    logo?: string;
    place?: number;
}

const ratingMovies: IRatingMovie = {
    id: 1,
    type: '',
    name: '',
    enName: '',
    posterUrl: require('../../../testAsserts/img/kingfisher.jpg'),
    posterPreviewURL: '',
    logo: require('../../../testAsserts/img/kingfisher.png'),
    year: 2022,
    description: '',
    shortDescription: '',
    ageRating: 18,
    ratingKp: 8,
    votesKp: 1000,
    movieLength: 120,
    genres: [],
    countries: [],
    persons: [],
    place: 1,
    trailer: '',
    watchingWithMovie: [],
    comments: [],
};

export const RatingPoster: Story = {
    args: {
        movie: ratingMovies,
    },
};

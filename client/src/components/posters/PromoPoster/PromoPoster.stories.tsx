import { Meta, StoryObj } from '@storybook/react';
import './PromoPoster.module.scss';
import Poster from './PromoPoster';
import IMovie from '@/models/IMovie';

const meta: Meta<typeof Poster> = {
    title: 'Poster/PromoPoster',
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

interface IMoviePromo extends IMovie {
    shortDescriptionEn?: string;
    logo?: string;
}

const promoMovies: IMoviePromo = {
    id: 1,
    type: '',
    name: 'сыщицы',
    enName: '',
    posterUrl: require('../../../testAsserts/img/detectives.jpg'),
    posterPreviewURL: require('../../../testAsserts/img/detectives.jpg'),
    logo: 'https://thumbs.dfs.ivi.ru/storage33/contents/1/3/99035f529d7c175424b1c905d36462.png/x200/',
    year: 2023,
    description: '',
    shortDescription: 'Яркая сыщица и тихоня-учёная должны объединить усилия, чтобы раскрыть запутанное дело',
    shortDescriptionEn: 'A striking detective and a timid scientist must team up to solve a complicated case',
    ageRating: 18,
    ratingKp: 8,
    votesKp: 1000,
    movieLength: 120,
    genres: [],
    countries: [],
    persons: [],
    trailer: '',
    watchingWithMovie: [],
    comments: [],
};

export const PromoPoster: Story = {
    args: {
        movie: promoMovies,
    },
};

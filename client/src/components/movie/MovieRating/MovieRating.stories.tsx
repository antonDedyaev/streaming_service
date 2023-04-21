import { Meta, StoryObj } from '@storybook/react';
import MovieRating from './MovieRating';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './MovieRating.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

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
    title: 'Название',
    year: 1900,
    ageLimit: '0+',
    time: 'Длительность',
    production: 'Производство',
    genres: ['Жанр', 'Жанр', 'Жанр'],
    displays: ['FullHD', 'HD', '1080', '720'],
    voiceActing: ['Рус', 'Eng'],
    subtitles: ['Рус'],
    subtitlesFull: ['Русский'],
    description: [],
    language: ['Русский', 'Английский'],
    raiting: 9.5,
    nameraiting: 'Рейтинг',
    actors: [],
};

export const FullScreen: Story = {
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19' }}>
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

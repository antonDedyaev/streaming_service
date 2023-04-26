import { Meta, StoryObj } from '@storybook/react';
import MovieOptions from './MovieOptions';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './MovieOptions.module.scss';
import { IMovie } from '../../movie/movieMedallion/MovieMedallionsList/Temp/IMovie';

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
    args: {
        movie: data,
    },
};

export const MobileScreen: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
    args: {
        movie: data,
    },
};

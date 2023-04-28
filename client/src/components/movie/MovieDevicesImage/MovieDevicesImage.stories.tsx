import { Meta, StoryObj } from '@storybook/react';
import MovieDevicesImage from './MovieDevicesImage';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './MovieDevicesImage.module.scss';
import { IMovie } from '../../movie/movieMedallion/MovieMedallionsList/Temp/IMovie';

const meta: Meta<typeof MovieDevicesImage> = {
    title: 'Cards/DevicesImage',
    component: MovieDevicesImage,
};

export default meta;

type Story = StoryObj<typeof MovieDevicesImage>;

const data: IMovie = {
    id: 1,
    title: 'Название',
    poster: require('../../../testAsserts/img/BG554460.jpg'),
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

export const DevicesImage: Story = {
    args: {
        movie: data,
    },
};

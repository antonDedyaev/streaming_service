import { Meta, StoryObj } from '@storybook/react';
import MovieParams from './MovieParams';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './MovieParams.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';

const meta: Meta<typeof MovieParams> = {
    title: 'Information/Params',
    component: MovieParams,
};

export default meta;

type Story = StoryObj<typeof MovieParams>;

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
                <Story />
            </div>
        ),
    ],
    args: {
        movie: data,
    },
};

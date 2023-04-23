import { Meta, StoryObj } from '@storybook/react';
import ImgSquareUI from './ImgSquareUI';
import './ImgSquareUI.module.scss';
import IActor from '@/models/IActor';

const meta: Meta<typeof ImgSquareUI> = {
    title: 'Cards/ImgSquare',
    component: ImgSquareUI,
};

export default meta;

type Story = StoryObj<typeof ImgSquareUI>;

const actor: IActor = {
    id: 1,
    img: require('../../../../testAsserts/img/actorTest1.jpg'),
    amtMovies: 1,
    firstName: 'Руперт',
    lastName: 'Гринт',
    role: 'актер',
};

export const BorderSmall: Story = {
    decorators: [
        (Story) => (
            <div style={{ position: 'absolute', width: '56px', height: '56px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        actor: actor,
    },
};

export const BorderMedium: Story = {
    decorators: [
        (Story) => (
            <div style={{ position: 'absolute', width: '120px', height: '120px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        actor: actor,
        border: 'medium',
    },
};

import { Meta, StoryObj } from '@storybook/react';
import SquareCard from './SquareCard';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './SquareCard.module.scss';

const meta: Meta<typeof SquareCard> = {
    title: 'Cards/Square',
    component: SquareCard,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: false,
        },
    },
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', padding: '10px 10px 0px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof SquareCard>;

export const Active: Story = {
    args: {
        href: '/',
        src: require('../../../testAsserts/img/BG554460.jpg'),
        alt: 'Название',
        caption: 'Название',
    },
};

export const Static: Story = {
    args: {
        disabled: true,
        mainValue: 6.2,
        caption: `Рейтинг`,
    },
};

export const StaticGood: Story = {
    args: {
        disabled: true,
        mainValue: 9.7,
        caption: `Рейтинг`,
    },
};

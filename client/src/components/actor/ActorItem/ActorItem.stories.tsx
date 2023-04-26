import { Meta, StoryObj } from '@storybook/react';
import ActorItem from './ActorItem';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './ActorItem.module.scss';

const meta: Meta<typeof ActorItem> = {
    title: 'Cards/Round',
    component: ActorItem,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: false,
        },
    },
};

export default meta;

type Story = StoryObj<typeof ActorItem>;

export interface IData {
    id: number;
    img: string;
    amtMovies: number;
    firstName: string;
    lastName: string;
    role: string;
}

const data: IData = {
    id: 1,
    img: require('../../../testAsserts/img/BG554460.jpg'),
    amtMovies: 4,
    firstName: 'Имя',
    lastName: 'Фамилия',
    role: 'Роль',
};

export const Effect: Story = {
    decorators: [
        (Story) => (
            <div style={{ width: '153px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        actor: data,
        size: 'large',
    },
};

export const Large: Story = {
    decorators: [
        (Story) => (
            <div style={{ width: '153px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        actor: data,
        size: 'large',
    },
};

export const Medium: Story = {
    decorators: [
        (Story) => (
            <div style={{ width: '128px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        actor: data,
        size: 'medium',
    },
};

export const Small: Story = {
    decorators: [
        (Story) => (
            <div style={{ width: '88px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        actor: data,
        size: 'small',
    },
};

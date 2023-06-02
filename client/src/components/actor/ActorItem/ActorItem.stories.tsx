import { Meta, StoryObj } from '@storybook/react';
import ActorItem from './ActorItem';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './ActorItem.module.scss';
import IPerson from '@/models/IPerson';

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

const data: IPerson = {
    id: 1,
    name: 'Фамилия Имя',
    enName: 'Фамилия Имя',
    photo: require('../../../testAsserts/img/BG554460.jpg'),
    profession: ['профессия'],
    enProfession: ['профессия'],
    countMovies: 4,
};

export const Large: Story = {
    decorators: [
        (Story) => (
            <div style={{ minWidth: '153px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        person: data,
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
        person: data,
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
        person: data,
        size: 'small',
    },
};

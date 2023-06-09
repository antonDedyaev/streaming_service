import { Meta, StoryObj } from '@storybook/react';
import PersonItem from './PersonItem';
import './PersonItem.module.scss';
import IPerson from '@/models/IPerson';

const meta: Meta<typeof PersonItem> = {
    title: 'Cards/Round',
    component: PersonItem,
    argTypes: {
        size: {
            control: false,
        },
    },
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', paddingLeft: '10px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof PersonItem>;

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

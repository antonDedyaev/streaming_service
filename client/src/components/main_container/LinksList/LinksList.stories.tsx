import { Meta, StoryObj } from '@storybook/react';
import './LinksList.module.scss';
import LinksList from './LinksList';

const meta: Meta<typeof LinksList> = {
    title: 'Links/LinksList',
    component: LinksList,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', padding: '10px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof LinksList>;

export const Row: Story = {
    args: {
        direction: 'row',
        links: [
            {
                href: '/',
                text: 'Ссылка 1',
            },
            {
                href: '/',
                text: 'Ссылка 2',
            },
            {
                href: '/',
                text: 'Ссылка 3',
            },
            {
                href: '/',
                text: 'Ссылка 4',
            },
            {
                href: '/',
                text: 'Ссылка 5',
            },
        ],
    },
};

export const Column: Story = {
    args: {
        direction: 'column',
        links: [
            {
                href: '/',
                text: 'Ссылка 1',
            },
            {
                href: '/',
                text: 'Ссылка 2',
            },
            {
                href: '/',
                text: 'Ссылка 3',
            },
            {
                href: '/',
                text: 'Ссылка 4',
            },
            {
                href: '/',
                text: 'Ссылка 5',
            },
        ],
    },
};

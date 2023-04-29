import { Meta, StoryObj } from '@storybook/react';
import MovieMedallionItem from './MovieMedallionItem';
import '../../../../styles/globals.scss';
import './MovieMedallionItem.module.scss';

const meta: Meta<typeof MovieMedallionItem> = {
    title: 'Cards/Medallion',
    component: MovieMedallionItem,
    argTypes: {
        disabled: {
            control: false,
        },
    },
};

export default meta;

type Story = StoryObj<typeof MovieMedallionItem>;

export const Active: Story = {
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', padding: '10px 10px 0px', cursor: 'pointer', width: '100px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        text: 'Текст',
        children: <div></div>,
    },
};

export const inActive: Story = {
    decorators: [
        (Story) => (
            <div style={{ background: '#100e19', padding: '10px 10px 0px', width: '100px' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        text: 'Текст',
        children: <div></div>,
        disabled: true,
    },
};

import { Meta, StoryObj } from '@storybook/react';
import ImgSquareUI from './ImgSquareUI';
import './ImgSquareUI.module.scss';
import IPerson from '@/models/IPerson';

const meta: Meta<typeof ImgSquareUI> = {
    title: 'Cards/ImgSquare',
    component: ImgSquareUI,
};

export default meta;

type Story = StoryObj<typeof ImgSquareUI>;

const actor: IPerson = {
    id: 1,
    name: '',
    enName: '',
    photo: require('../../../../testAsserts/img/BG554460.jpg'),
    profession: [''],
    enProfession: [''],
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
        person: actor,
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
        person: actor,
        border: 'medium',
    },
};

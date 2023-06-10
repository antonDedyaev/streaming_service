import { Meta, StoryObj } from '@storybook/react';
import './CommentsList.module.scss';
import CommentsList from './CommentsList';
import { commentsTest } from '../../../testAsserts/testItems';

const meta: Meta<typeof CommentsList> = {
    title: 'Information/Comments',
    component: CommentsList,
    decorators: [
        (Story) => (
            <div style={{ width: '800px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof CommentsList>;

export const Comments: Story = {
    args: {
        comments: commentsTest,
    },
};

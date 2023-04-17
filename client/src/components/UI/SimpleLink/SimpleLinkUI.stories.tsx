import { Meta, StoryObj } from '@storybook/react';
import SimpleLinkUI from './SimpleLinkUI';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './SimpleLinkUI.module.scss';

const meta: Meta<typeof SimpleLinkUI> = {
  title: 'Links/SimpleLink',
  component: SimpleLinkUI,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ background: '#100e19' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SimpleLinkUI>;

export const Bright: Story = {
  args: {
    href: '/',
    children: 'Ссылка',
    option: 'bright',
  },
};

export const Dim: Story = {
  args: {
    href: '/',
    children: 'Ссылка',
    option: 'dim',
  },
};

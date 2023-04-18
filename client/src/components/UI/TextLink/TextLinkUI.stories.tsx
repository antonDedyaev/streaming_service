import { Meta, StoryObj } from '@storybook/react';
import TextLinkUI from './TextLinkUI';
import '../../../styles/nullstyle.scss';
import '../../../styles/globals.scss';
import './TextLinkUI.module.scss';

const meta: Meta<typeof TextLinkUI> = {
  title: 'Links/TextLink',
  component: TextLinkUI,
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

type Story = StoryObj<typeof TextLinkUI>;

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

export const Gradient: Story = {
  args: {
    href: '/',
    children: 'Градиентная ссылка',
    option: 'gradient',
  },
};

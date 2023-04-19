import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import LinkUI from './LinkUI';
import styles from './LinkUI.module.scss';
import mailIcon from '../../../../public/icons/link_icons/mail.svg';

const meta: Meta<typeof LinkUI> = {
    title: 'Links/Link',
    component: LinkUI,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinkUI>;

export const VKLink: Story = {
    args: {
        shape: 'round',
        linkTo: 'https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e',
        children: (
            <img
                src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg"
                alt="Social media logo"
            />
        ),
    },
};

export const MailLink: Story = {
    args: {
        shape: 'square',
        linkTo: 'mailto:support@ivi.ru',
        children: <Image src={mailIcon} alt="Mail logo" />,
    },
};

export const AppStoreLink: Story = {
    args: {
        shape: 'rectangular',
        linkTo: 'https://go.onelink.me/app/devicesiOS',
        children: (
            <>
                <img src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg" alt="Store logo" />
                <div className={styles.text__block}>
                    <div className={styles.text__block__preamble}>Загрузить в</div>
                    <div className={styles.text__block__caption}>App Store</div>
                </div>
            </>
        ),
    },
};

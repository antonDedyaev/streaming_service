import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import ShapedLinkUI from './ShapedLinkUI';
import footerStyles from '../../../main_container/Footer/Footer.module.scss';
import mailIcon from '../../../../../public/icons/link/mail.svg';

const meta: Meta<typeof ShapedLinkUI> = {
    title: 'Links/ShapedLink',
    component: ShapedLinkUI,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShapedLinkUI>;

export const VKLink: Story = {
    args: {
        shape: 'round',
        href: 'https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e',
        children: (
            <Image
                src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg"
                height={16}
                width={16}
                alt="логотип ВКонтакте"
            />
        ),
    },
};

export const MailLink: Story = {
    args: {
        shape: 'square',
        href: 'mailto:support@ivi.ru',
        children: <Image src={mailIcon} height={16} width={16} alt="Иконка почты" />,
    },
};

export const AppStoreLink: Story = {
    args: {
        shape: 'rectangular',
        href: 'https://go.onelink.me/app/devicesiOS',
        children: (
            <>
                <Image
                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg"
                    height={20}
                    width={20}
                    alt="Логотип AppStore"
                />
                <div className={footerStyles.container__textBlock}>
                    <div>Загрузить в</div>
                    <div>App Store</div>
                </div>
            </>
        ),
    },
};

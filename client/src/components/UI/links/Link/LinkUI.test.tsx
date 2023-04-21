import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import LinkUI from './LinkUI';
import './LinkUI.module.scss';
import footerStyles from '../../../footer/Footer.module.scss';
import devicesIcon from '../../../../public/icons/link_icons/devices_all.svg';

describe('LinkUI SNAPSHOT TESTS', () => {
    test('Round link should not be changed', () => {
        render(
            <LinkUI href="https://t.me/official_iviru" shape="round">
                <Image
                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_telegram.svg"
                    height={16}
                    width={16}
                    alt="Логотип Telegram"
                />
            </LinkUI>,
        );
        const link = screen.getByRole('link-to-media');

        expect(link).toMatchSnapshot();
    });

    test('Rectangular link should not be changed', () => {
        render(
            <LinkUI href="#!" shape="rectangular" className={footerStyles.iviFooter__storeLink}>
                <div className={footerStyles.iviFooter__storeLink_textSingle}>
                    <Image src={devicesIcon} height={20} width={20} alt="Иконка умных устройств" />
                    Все устройства
                </div>
            </LinkUI>,
        );
        const link = screen.getByRole('link-to-media');

        expect(link).toMatchSnapshot();
    });
});

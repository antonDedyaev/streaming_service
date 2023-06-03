import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import ShapedLinkUI from './ShapedLinkUI';
import './ShapedLinkUI.module.scss';
import footerStyles from '../../../footer/Footer.module.scss';
import devicesIcon from '../../../../public/icons/link_icons/devices_all.svg';

describe('ShapedLinkUI SNAPSHOT TESTS', () => {
    test('Round link should not be changed', () => {
        render(
            <ShapedLinkUI href="https://t.me/official_iviru" shape="round">
                <Image
                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_telegram.svg"
                    height={16}
                    width={16}
                    alt="Логотип Telegram"
                />
            </ShapedLinkUI>,
        );
        const link = screen.getByRole('link');

        expect(link).toMatchSnapshot();
    });

    test('Rectangular link should not be changed', () => {
        render(
            <ShapedLinkUI href="#!" shape="rectangular">
                <div className={footerStyles.container__textSingle}>
                    <Image src={devicesIcon} height={20} width={20} alt="Иконка умных устройств" />
                    Все устройства
                </div>
            </ShapedLinkUI>,
        );
        const link = screen.getByRole('link');

        expect(link).toMatchSnapshot();
    });
});

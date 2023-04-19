import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import LinkUI from './LinkUI';
import styles from './LinkUI.module.scss';
import devicesIcon from '../../../../public/icons/link_icons/devices_all.svg';

describe('LinksUI SNAPSHOT TESTS', () => {
    test('Round link should not be changed', () => {
        render(
            <LinkUI linkTo="https://t.me/official_iviru" shape="round">
                <img
                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_telegram.svg"
                    alt="Логотип Telegram"
                />
            </LinkUI>,
        );
        const link = screen.getByRole('link-to-media');

        expect(link).toMatchSnapshot();
    });

    test('Rectangular link should not be changed', () => {
        render(
            <LinkUI linkTo="#" shape="rectangular">
                <div className={styles.text__single}>
                    <Image src={devicesIcon} height="20" width="20" alt="Devices logo" />
                    Все устройства
                </div>
            </LinkUI>,
        );
        const link = screen.getByRole('link-to-media');

        expect(link).toMatchSnapshot();
    });
});

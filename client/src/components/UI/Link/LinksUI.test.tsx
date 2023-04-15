import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import SocialLinkUI from './SocialLinkUI';
import AppStoreLinkUI from './AppStoreLinkUI';

describe('LinksUI SNAPSHOTS TESTS', () => {
    test('SocialLinkUI should not be changed', () => {
        render(
            <SocialLinkUI
                href='https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e'
                logo='https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg'
            />
        )
        const link = screen.getByRole('link-to-media');

        expect(link).toMatchSnapshot()
    })

    test('AppStoreLinkUI should not be changed', () => {
        render(
            <AppStoreLinkUI
                href='https://go.onelink.me/app/devicesiOS'
                logo='https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg'
                linkTexts={['Загрузить в', 'App Store']}
            />
        )
        const link = screen.getByRole('link-to-store');

        expect(link).toMatchSnapshot()
    })
})
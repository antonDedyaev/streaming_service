import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TabBarLinkUI from './TabBarLinkUI';
import catalogueIcon from '../../../../../public/icons/tabbar_icons/catalogue.svg';

describe('TabBarLinkUI SNAPSHOT TEST', () => {
    test('TabBarLinkUI should not be changed', () => {
        render(<TabBarLinkUI selected={true} href="" icon={catalogueIcon} text="Каталог" />);
        const link = screen.getByRole('tab-link');

        expect(link).toMatchSnapshot();
    });
});

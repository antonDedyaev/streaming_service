import { FC, useState } from 'react';
import styles from './TabBar.module.scss';
import TabBarLinkUI from '../../UI/links/TabBarLink/TabBarLinkUI';
import homeIcon from '../../../../public/icons/tabbar/home.svg';
import catalogueIcon from '../../../../public/icons/tabbar/catalogue.svg';
import magnifyingGlass from '../../../../public/icons/tabbar/magnifying_glass.svg';
import monitorIcon from '../../../../public/icons/tabbar/monitor.svg';
import dotsIcon from '../../../../public/icons/tabbar/dots.svg';
import { useRouter } from 'next/router';

const TabBar: FC = () => {
    const { pathname } = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.container__tabBar}>
                <TabBarLinkUI selected={pathname === '/' ? true : false} href="https://www.ivi.ru/" icon={homeIcon} text="Мой Иви" />
                <TabBarLinkUI selected={pathname === '/movies' ? true : false} href="https://www.ivi.ru/movies" icon={catalogueIcon} text="Каталог" />
                <TabBarLinkUI selected={pathname === '/search' ? true : false} href="#!" icon={magnifyingGlass} text="Поиск" />
                <TabBarLinkUI selected={pathname === '/tvplus' ? true : false} href="https://www.ivi.ru/tvplus" icon={monitorIcon} text="TV+" />
                <TabBarLinkUI selected={pathname === '/more' ? true : false} href="#!" icon={dotsIcon} text="Ещё" />
            </div>
        </div>
    );
};

export default TabBar;
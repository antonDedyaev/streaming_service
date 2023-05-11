import { FC } from 'react';
import styles from './TabBar.module.scss';
import TabBarLinkUI from '../../UI/links/TabBarLink/TabBarLinkUI';
import homeIcon from '../../../../public/icons/tabbar/home.svg';
import catalogueIcon from '../../../../public/icons/tabbar/catalogue.svg';
import magnifyingGlass from '../../../../public/icons/tabbar/magnifying_glass.svg';
import monitorIcon from '../../../../public/icons/tabbar/monitor.svg';
import dotsIcon from '../../../../public/icons/tabbar/dots.svg';
import { useRouter } from 'next/router';

const TabBar: FC = () => {
    const { pathname, asPath, query } = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.container__tabBar}>
                <TabBarLinkUI selected={asPath === '/' ? true : false} href="https://www.ivi.ru/" icon={homeIcon} text="Мой Иви" />
                <TabBarLinkUI selected={asPath === '/movies' ? true : false} href="/movies" icon={catalogueIcon} text="Каталог" />
                <TabBarLinkUI selected={'ivi_search' in query ? true : false} href={`${asPath}?ivi_search`} icon={magnifyingGlass} text="Поиск" />
                <TabBarLinkUI selected={pathname === '/tvplus' ? true : false} href="https://www.ivi.ru/tvplus" icon={monitorIcon} text="TV+" />
                <TabBarLinkUI selected={pathname === '/more' ? true : false} href="#!" icon={dotsIcon} text="Ещё" />
            </div>
        </div>
    );
};

export default TabBar;
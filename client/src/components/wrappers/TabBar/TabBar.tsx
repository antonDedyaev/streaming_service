import { FC } from 'react';
import styles from './TabBar.module.scss';
import TabBarLinkUI from '@/components/UI/links/TabBarLink/TabBarLinkUI';
import homeIcon from '../../../../public/icons/tabbar/home.svg';
import catalogueIcon from '../../../../public/icons/tabbar/catalogue.svg';
import magnifyingGlass from '../../../../public/icons/tabbar/magnifying_glass.svg';
import monitorIcon from '../../../../public/icons/tabbar/monitor.svg';
import dotsIcon from '../../../../public/icons/tabbar/dots.svg';

const TabBar: FC = () => {
    return (
        <div className={styles.tabBarPlate}>
            <div className={styles.tabBar}>
                <TabBarLinkUI href="https://www.ivi.ru/" icon={homeIcon} text="Мой Иви" />
                <TabBarLinkUI href="https://www.ivi.ru/movies" icon={catalogueIcon} text="Каталог" />
                <TabBarLinkUI href="#!" icon={magnifyingGlass} text="Поиск" />
                <TabBarLinkUI href="https://www.ivi.ru/tvplus" icon={monitorIcon} text="TV+" />
                <TabBarLinkUI href="#!" icon={dotsIcon} text="Ещё" />
            </div>
        </div>
    );
};

export default TabBar;

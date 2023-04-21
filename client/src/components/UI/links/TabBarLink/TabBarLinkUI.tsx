import Image from 'next/image';
import styles from './TabBarLinkUI.module.scss';
import { useState } from 'react';

interface TabBarLinkUIProps {
    href: string;
    icon: HTMLImageElement;
    text: string;
}

const TabBarLinkUI = ({ href, icon, text }: TabBarLinkUIProps) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleTabClicked = ({ currentTarget }: React.MouseEvent<HTMLAnchorElement>) => {
        const allTabs = document.querySelectorAll(`.${styles.tabBar__item}`);
        allTabs.forEach((item) => item.classList.remove(styles.tabBar__item_selected));
        currentTarget.classList.add(styles.tabBar__item_selected);
    };

    return (
        <a
            id="tab-item"
            href={href}
            className={[styles.tabBar__item, isSelected ? styles.tabBar__item_selected : null].join(' ')}
            onClick={handleTabClicked}
            role="tab-link"
        >
            <div className={styles.tabBar__itemGlow}></div>
            <div className={styles.tabBar__itemIcon}>
                <Image src={icon} height={20} width={20} alt={`Иконка ${text}`} />
            </div>
            <div className={styles.tabBar__itemCaption}>{text}</div>
        </a>
    );
};

export default TabBarLinkUI;

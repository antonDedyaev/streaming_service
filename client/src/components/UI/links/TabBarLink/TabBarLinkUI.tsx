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

    return (
        <a
            href={href}
            className={[styles.tabBar__item, isSelected ? styles.tabBar__item_selected : null].join(' ')}
            onClick={() => setIsSelected(true)}
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

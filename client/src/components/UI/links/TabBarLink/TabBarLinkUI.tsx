import Image from 'next/image';
import Link from 'next/link';
import styles from './TabBarLinkUI.module.scss';

interface TabBarLinkUIProps {
    href: string;
    icon: HTMLImageElement;
    text: string;
}

const TabBarLinkUI = ({ href, icon, text }: TabBarLinkUIProps) => {
    const handleTabClicked = ({ currentTarget }: React.MouseEvent<HTMLAnchorElement>) => {
        const allTabs = document.querySelectorAll(`.${styles.container__item}`);
        allTabs.forEach((item) => item.classList.remove(styles.container__item_selected));
        currentTarget.classList.add(styles.container__item_selected);
    };

    return (
        <Link id="tab-item" href={href} className={styles.container__item} onClick={handleTabClicked} role="tab-link">
            <div className={styles.container__itemGlow}></div>
            <div className={styles.container__itemIcon}>
                <Image src={icon} height={20} width={20} alt={`Иконка ${text}`} />
            </div>
            <div className={styles.container__itemCaption}>{text}</div>
        </Link>
    );
};

export default TabBarLinkUI;

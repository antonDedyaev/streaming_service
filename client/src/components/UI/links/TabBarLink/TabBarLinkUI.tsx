import Image from 'next/image';
import Link from 'next/link';
import styles from './TabBarLinkUI.module.scss';

interface TabBarLinkUIProps {
    href: string;
    icon: HTMLImageElement;
    text: string;
    selected: boolean;
}

const TabBarLinkUI = ({ href, icon, text, selected }: TabBarLinkUIProps) => {
    return (
        <Link
            id="tab-item"
            href={href}
            className={[styles.container, selected ? styles.container_selected : ''].join(' ')}
            role="tab-link"
        >
            <div className={styles.container__itemGlow}></div>
            <div className={styles.container__itemIcon}>
                <Image src={icon} height={20} width={20} alt={`Иконка ${text}`} />
            </div>
            <div className={styles.container__itemCaption}>{text}</div>
        </Link>
    );
};

export default TabBarLinkUI;

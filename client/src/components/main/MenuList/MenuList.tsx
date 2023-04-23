import Link from 'next/link';
import styles from './MenuList.module.scss';
import TextLinkUI from '@/components/UI/links/TextLink/TextLinkUI';

interface ILink {
    href: string;
    text: string;
    className?: string;
    onMouseOver?: () => void;
}

interface MenuListProps {
    className: string;
    links: ILink[];
}

function MenuList({ className, links }: MenuListProps) {
    return (
        <ul className={[styles.container, className].join(' ')}>
            {links.map((link) => (
                <li className={styles.container__item} key={link.text}>
                    <TextLinkUI className={link.className} onMouseOver={link.onMouseOver} href={link.href} option="dim">
                        {link.text}
                    </TextLinkUI>
                </li>
            ))}
        </ul>
    );
}

export default MenuList;

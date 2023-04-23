import styles from './MenuList.module.scss';
import TextLinkUI from '../UI/links/TextLink/TextLinkUI';

interface ILink {
    href: string;
    text: string;
    option: 'bright' | 'dim' | 'gradient';
    className?: string;
    onMouseOver?: () => void;
}

interface MenuListProps {
    direction: 'row' | 'column';
    links: ILink[];
}

function MenuList({ links, direction }: MenuListProps) {
    return (
        <ul
            className={[direction === 'row' ? styles.container : styles.containerCol, styles.container__menu].join(' ')}
        >
            {links.map((link) => (
                <li className={styles.container__item} key={link.text}>
                    <TextLinkUI
                        className={link.className}
                        onMouseOver={link.onMouseOver}
                        href={link.href}
                        option={link.option}
                    >
                        {link.text}
                    </TextLinkUI>
                </li>
            ))}
        </ul>
    );
}

export default MenuList;

import styles from './LinksList.module.scss';
import TextLinkUI from '../../UI/links/TextLink/TextLinkUI';

interface ILink {
    href: string;
    text: string;
    option?: 'bright' | 'dim' | 'gradient';
    className?: string;
    onMouseOver?: () => void;
}

interface LinksListProps {
    direction: 'row' | 'column';
    links: ILink[];
}

const LinksList = ({ links, direction }: LinksListProps) => {
    return (
        <ul
            className={[direction === 'row' ? styles.container : styles.container__column, styles.container__menu].join(
                ' ',
            )}
        >
            {links.map((link) => (
                <li className={styles.container__item} key={link.text}>
                    <TextLinkUI
                        className={link.className}
                        onMouseOver={() => (link.onMouseOver ? link.onMouseOver() : '')}
                        href={link.href}
                        option={link.option ?? 'dim'}
                    >
                        {link.text}
                    </TextLinkUI>
                </li>
            ))}
        </ul>
    );
};

export default LinksList;

import styles from './DropMenu.module.scss';
import TextLinkUI from '../../UI/links/TextLink/TextLinkUI';
import { firstCapitalLetter } from '../../../utils/functions';

interface IContent {
    title: string;
    links: {
        text: string;
        href: string;
    }[];
}

interface DropMenuProps {
    className: string;
    content: IContent[];
}

const DropMenu = ({ className, content }: DropMenuProps) => {
    return (
        <div className={[styles.container, className].join(' ')} data-testid={'dropMenu'}>
            {content.map((item) => (
                <div key={item.title} className={styles.container__item}>
                    <h2 className={styles.container__title}>{item.title}</h2>
                    <div className={styles.container__content}>
                        {item.links.map((link, index) => (
                            <TextLinkUI key={index} className={styles.container__link} href={link.href} option="dim">
                                {firstCapitalLetter(link.text)}
                            </TextLinkUI>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DropMenu;

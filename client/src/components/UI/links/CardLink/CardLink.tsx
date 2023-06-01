import Link from 'next/link';
import styles from './CardLink.module.scss';
import { ReactNode } from 'react';

interface ICardLinkProps {
    href: string;
    children: ReactNode;
    onClick?: () => void;
}

const CardLink = ({ href, children, onClick }: ICardLinkProps) => {
    return (
        <div onClick={onClick}>
            <Link href={href} className={styles.container}>
                <div className={styles.container__content}>{children}</div>
            </Link>
        </div>
    );
};

export default CardLink;

import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './LinkUI.module.scss';

interface LinkUIProps {
    children: ReactNode;
    href: string;
    shape: 'rectangular' | 'square' | 'round';
    className?: string;
}

const LinkUI = ({ children, href, shape, className }: LinkUIProps) => {
    const linkFormClass =
        shape === 'round'
            ? styles.container__wrapper_round
            : shape === 'square'
            ? styles.container__wrapper_square
            : styles.container__wrapper_rectangular;

    return (
        <Link
            href={href}
            className={[styles.container__wrapper, linkFormClass, className].join(' ')}
            target="blank"
            role="link-to-media"
        >
            <div className={styles.container__content}>{children}</div>
        </Link>
    );
};

export default LinkUI;

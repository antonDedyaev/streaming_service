import { ReactNode } from 'react';
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
            ? styles.link__wrapper_round
            : shape === 'square'
            ? styles.link__wrapper_square
            : styles.link__wrapper_rectangular;

    return (
        <a
            href={href}
            className={[styles.link__wrapper, linkFormClass, className].join(' ')}
            target="blank"
            role="link-to-media"
        >
            <div className={styles.link__content}>{children}</div>
        </a>
    );
};

export default LinkUI;

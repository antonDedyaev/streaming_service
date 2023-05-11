import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './ShapedLinkUI.module.scss';

interface LinkUIProps {
    children: ReactNode;
    href: string;
    shape: 'rectangular' | 'square' | 'round';
    className?: string;
    target?: string;
}

const ShapedLinkUI = ({ children, href, shape, className, target }: LinkUIProps) => {
    const linkFormClass =
        shape === 'round'
            ? styles.container_round
            : shape === 'square'
            ? styles.container_square
            : styles.container_rectangular;

    return (
        <Link
            href={href}
            className={[styles.container, linkFormClass, className].join(' ')}
            role="link-to-media"
            target={target}
        >
            <div className={styles.container__content}>{children}</div>
        </Link>
    );
};

export default ShapedLinkUI;

import { ReactNode } from 'react';
import styles from './LinkUI.module.scss';

interface LinkUIProps {
    children: ReactNode;
    linkTo?: string;
    shape: 'rectangular' | 'square' | 'round';
}

const LinkUI = ({ children, linkTo, shape }: LinkUIProps) => {
    const linkFormClass =
        shape === 'round'
            ? styles.link__wrapper_round
            : shape === 'square'
            ? styles.link__wrapper_square
            : styles.link__wrapper_rectangular;

    return (
        <a
            href={linkTo}
            className={[styles.link__wrapper, linkFormClass].join(' ')}
            target="blank"
            role="link-to-media"
        >
            <div className={styles.link__content}>{children}</div>
        </a>
    );
};

export default LinkUI;

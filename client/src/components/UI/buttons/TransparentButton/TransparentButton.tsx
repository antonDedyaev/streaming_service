import { ReactNode } from 'react';
import styles from './TransparentButton.module.scss';

interface TransparentButtonProps {
    children: ReactNode;
    className: string;
    onClick?: () => void;
}

const TransparentButton = ({ children, className, onClick }: TransparentButtonProps) => {
    return (
        <button
            className={[styles.button, className].join(' ')}
            type='button'
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default TransparentButton;
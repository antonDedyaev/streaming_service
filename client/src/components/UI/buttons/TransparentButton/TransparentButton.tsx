import { ReactNode } from 'react';
import styles from './TransparentButton.module.scss';

interface TransparentButtonProps {
    children: ReactNode;
    textColor: 'bright' | 'faded'
    className: string;
    onClick?: () => void;
}

const TransparentButton = ({ children, textColor, className, onClick }: TransparentButtonProps) => {
    return (
        <button
            className={[styles.button, styles[`button_${textColor}`], className].join(' ')}
            type='button'
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default TransparentButton;
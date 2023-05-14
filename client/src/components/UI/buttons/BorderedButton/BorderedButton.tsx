import { ReactNode } from 'react';
import styles from './BorderedButton.module.scss';

interface BorderedButtonProps {
    children: ReactNode;
    size: 'large' | 'medium' | 'small';
    className: string;
    onClick?: () => void;
}

const BorderedButton = ({ children, size, className, onClick }: BorderedButtonProps) => {
    return (
        <button
            className={[styles.button, styles[`button_${size}`], className].join(' ')}
            type='button'
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default BorderedButton;

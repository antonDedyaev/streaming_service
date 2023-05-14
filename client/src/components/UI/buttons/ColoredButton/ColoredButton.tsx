import { ReactNode } from 'react';
import styles from './ColoredButton.module.scss';

interface ColoredButtonProps {
    children: ReactNode;
    size: 'large' | 'medium' | 'small';
    color: 'red' | 'gray' | 'lightGray';
    className: string;
    onClick?: () => void;
}

const ColoredButton = ({ children, size, color, className, onClick }: ColoredButtonProps) => {
    return (
        <button
            className={[styles.button, styles[`button_${size}`], styles[`button_${color}`], className].join(' ')}
            type='button'
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ColoredButton;
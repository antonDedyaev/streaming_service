import { ReactNode } from 'react';
import styles from './ColoredButton.module.scss';

interface ColoredButtonProps {
    children: ReactNode;
    size: 'large' | 'medium' | 'small';
    color: 'red' | 'gray' | 'lightGray';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const ColoredButton = ({ children, size, color, className, onClick, disabled }: ColoredButtonProps) => {
    return (
        <button
            className={[
                styles.button,
                styles[`button_${size}`],
                styles[`button_${color}`],
                className,
                disabled ? styles.button_disabled : '',
            ]
                .join(' ')
                .trim()}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ColoredButton;

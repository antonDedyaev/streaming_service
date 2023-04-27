import { ReactNode } from 'react';
import styles from './ButtonUI.module.scss';

interface ButtonUIProps {
    className: string;
    children: ReactNode;
    background: 'lightRed' | 'gray' | 'transparentWhite' | 'transparent';
    shape?: 'large' | 'medium' | 'small' | 'square' | 'none';
    onClick?: () => void;
}

const ButtonUI = ({ className, children, background, shape, onClick }: ButtonUIProps) => {
    return (
        <>
            <button
                className={[styles.button, styles[`button_${shape}`], 'button', className].join(' ')}
                onClick={onClick}
            >
                {children}
            </button>

            <style jsx>
                {`
                    .button {
                        background: ${background === 'lightRed'
                            ? '#ea003d'
                            : background === 'gray'
                            ? '#1f1b2e'
                            : background === 'transparentWhite'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'transparent'};
                    }

                    .button:hover {
                        background: ${background === 'lightRed'
                            ? '#e42e5f'
                            : background === 'gray'
                            ? '#2e2844'
                            : 'transparent'};
                    }
                `}
            </style>
        </>
    );
};

export default ButtonUI;

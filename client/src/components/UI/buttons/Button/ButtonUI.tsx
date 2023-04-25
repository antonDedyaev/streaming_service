import { ReactNode } from 'react';
import styles from './ButtonUI.module.scss';

interface ButtonUIProps {
    className: string;
    children: ReactNode;
    background: 'lightRed' | 'gray' | 'transparentWhite' | 'transparent';
    shape?: 'large' | 'medium' | 'small' | 'square' | 'none';
    onClick?: () => void;
}

function ButtonUI({ className, children, background, shape, onClick }: ButtonUIProps) {
    return (
        <>
            <button className={[styles.button, className, 'button'].join(' ')} onClick={onClick}>
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

                        padding: ${shape === 'large'
                            ? '10px 15px'
                            : shape === 'medium'
                            ? '10px 12px'
                            : shape === 'small'
                            ? '7px 11px'
                            : shape === 'square'
                            ? '5px'
                            : 'none'};
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
}

export default ButtonUI; /*'#1f1b2e'};*/

import { ReactNode } from 'react';
import styles from './ButtonUI.module.scss';

interface ButtonUIProps {
    className: string;
    children: ReactNode;
    background: 'lightRed' | 'gray' | 'transparentWhite';
    variant: 'large' | 'medium' | 'small' | 'square';
    onClick?: () => void;
}

function ButtonUI({ className, children, background, variant, onClick }: ButtonUIProps) {
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
                            : 'rgba(255, 255, 255, 0.08)'};

                        padding: ${variant === 'large'
                            ? '10px 15px'
                            : variant === 'medium'
                            ? '10px 12px'
                            : variant === 'small'
                            ? '7px 11px'
                            : /*variant === 'square' ? */ '5px'};
                    }

                    .button:hover {
                        background: ${background === 'lightRed' ? '#e42e5f' : /*background === 'gray' ? */ '#2e2844'};
                    }
                `}
            </style>
        </>
    );
}

export default ButtonUI; /*'#1f1b2e'};*/

/*background: ${background === 'lightRed' ? '#ea003d' : /*background === 'gray' ? */

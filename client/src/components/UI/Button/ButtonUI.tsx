import { ReactNode } from 'react'
import styles from './ButtonUI.module.scss'

interface ButtonUIProps {
    className: string
    children: ReactNode
    background: 'lightRed' | 'gray'
    variant: 'large' | 'medium' | 'small' | 'square'
}

function ButtonUI({ className, children, background, variant }: ButtonUIProps) {
    return (
        <>
            <button 
                className={[styles.button, className, 'button'].join(' ')}>
                {children}
            </button>

            <style jsx>
                {`
                    .button {
                        background: ${
                            background === 'lightRed' ? '#ea003d' : 
                          /*background === 'gray' ? */ '#ffffff14'
                        };

                        padding: ${
                            variant === 'large' ? '10px 15px' : 
                            variant === 'medium' ? '10px 12px' :
                            variant === 'small' ? '7px 11px' :
                          /*variant === 'square' ? */ '5px'
                        };
                    }

                    .button:hover {
                        background: ${
                            background === 'lightRed' ? '#e42e5f' : 
                          /*background === 'gray' ? */ '#ffffff25'
                        }
                    }
                `}
            </style>
        </>
    )
}

export default ButtonUI
import { ReactNode, useEffect } from 'react';
import styles from './ModalUI.module.scss';
import Image from 'next/image';
import closeIcon from '../../../../public/icons/close.svg';

interface ModalUIProps {
    children: ReactNode;
    onClick: () => void;
}

const ModalUI = ({ children, onClick }: ModalUIProps) => {
    const body = document.querySelector('body')!;

    useEffect(() => {
        body.classList.add('modal-active');
    }, []);

    const closeHandler = () => {
        body.classList.remove('modal-active');
        onClick();
    };

    return (
        <div className={styles.container}>
            {children}

            <button className={styles.container__button} onClick={closeHandler}>
                <Image className={styles.container__image} src={closeIcon} alt="закрыть" />
            </button>
        </div>
    );
};

export default ModalUI;

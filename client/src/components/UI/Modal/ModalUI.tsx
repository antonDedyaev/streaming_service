import { ReactNode, useEffect } from 'react';
import styles from './ModalUI.module.scss';
import Image from 'next/image';
import closeIcon from '../../../../public/icons/close.svg';
import { useRouter } from 'next/router';
import ButtonUI from '../buttons/Button/ButtonUI';

interface ModalUIProps {
    children: ReactNode;
    className?: string;
}

const ModalUI = ({ children, className }: ModalUIProps) => {
    const location = useRouter();
    const backPath = location.asPath.replace(/(\?ivi_search)|(\?sign-in)|(\?sign-up)|(\?more)/, '');

    const body = document.querySelector('body')!;

    useEffect(() => {
        body.classList.add('modal-active');
    }, []);

    const closeHandler = () => {
        body.classList.remove('modal-active');
        location.push(backPath);
    };

    return (
        <div className={[styles.container, className].join(' ')}>
            {children}

            <ButtonUI background="transparent" className={styles.container__button} onClick={closeHandler}>
                <Image className={styles.container__image} src={closeIcon} alt="закрыть" />
            </ButtonUI>
        </div>
    );
};

export default ModalUI;

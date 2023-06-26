import { ReactNode, useEffect } from 'react';
import styles from './ModalUI.module.scss';
import Image from 'next/image';
import closeIcon from '../../../../public/icons/close.svg';
import { useRouter } from 'next/router';
import TransparentButton from '../buttons/TransparentButton/TransparentButton';
interface ModalUIProps {
    children: ReactNode;
    className?: string;
    close?: boolean;
}

const ModalUI = ({ children, className, close }: ModalUIProps) => {
    const location = useRouter();
    const backPath = location.asPath.replace(
        /(\?ivi_search)|(\?sign-in)|(\?sign-up)|(\?authorized)|(\?trailer)|(\?more)|(\?validation=)|(\?validation)/,
        '',
    );

    const body = typeof document !== 'undefined' ? document?.querySelector('body') : true;

    useEffect(() => {
        body !== true && body?.classList.add('modal-active');
    }, [location.asPath]);

    const closeHandler = () => {
        body !== true && body?.classList.remove('modal-active');
        location.push(backPath);
    };

    useEffect(() => {
        close && body !== true && body?.classList.remove('modal-active');
        close && location.asPath.includes('?authorized' || '?sign-in' || '?sign-up' || '?validation') && closeHandler();

        body === true && closeHandler();
    }, [close]);

    return (
        <div className={[styles.container, className].join(' ')}>
            {children}

            <TransparentButton textColor="bright" className={styles.container__button} onClick={closeHandler}>
                <Image className={styles.container__image} src={closeIcon} alt="закрыть" />
            </TransparentButton>
        </div>
    );
};

export default ModalUI;

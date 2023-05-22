import { ReactNode, useEffect } from 'react';
import styles from './ModalUI.module.scss';
import Image from 'next/image';
import closeIcon from '../../../../public/icons/close.svg';
import { useRouter } from 'next/router';
import TransparentButton from '../buttons/TransparentButton/TransparentButton';

interface ModalUIProps {
    children: ReactNode;
    className?: string;
}

const ModalUI = ({ children, className }: ModalUIProps) => {
    const location = useRouter();
    const backPath = location.asPath.replace(/(\?ivi_search)|(\?sign-in)|(\?sign-up)|(\?trailer)|(\?more)/, '');

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

            <TransparentButton textColor="bright" className={styles.container__button} onClick={closeHandler}>
                <Image className={styles.container__image} src={closeIcon} alt="закрыть" />
            </TransparentButton>
        </div>
    );
};

export default ModalUI;

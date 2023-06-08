import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './ValidationModal.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import TextLinkUI from '@/components/UI/links/TextLink/TextLinkUI';

const ValidationModal = () => {
    const { asPath, locale } = useRouter();
    const [isClose, setIsClose] = useState(false);
    const backPath = asPath.replace(/(\?validation)=/, '');

    return (
        <ModalUI className={styles.modal} close={isClose}>
            <div className={styles.container} data-testid={'validationModal'}>
                <h2>
                    {locale === 'ru'
                        ? 'Время сеанса истекло, пожалуйста, войдите снова!'
                        : 'Session expired, please login again!'}
                </h2>
                <TextLinkUI
                    href={backPath.includes('admin') ? `/?sign-in` : `${backPath}?sign-in`}
                    option="gradient"
                    onClick={() => setIsClose(true)}
                >
                    {locale === 'ru' ? 'Войти' : 'Log-in'}
                </TextLinkUI>
            </div>
        </ModalUI>
    );
};

export default ValidationModal;

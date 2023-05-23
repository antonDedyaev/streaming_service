import { useRouter } from 'next/router';
import BorderedButton from '../UI/buttons/BorderedButton/BorderedButton';
import styles from './PageNotCreated.module.scss';
import { useTranslation } from 'next-i18next';

const PageNotCreated = () => {
    const router = useRouter();
    const { t } = useTranslation('moviesPage');
    return (
        <div className={styles.container}>
            <img src="/icons/attention.svg" alt="Внимание" />
            <p>{t('pageError')}</p>
            <BorderedButton size="medium" className={styles.button} onClick={() => router.back()}>
                {t('buttonBack')}
            </BorderedButton>
        </div>
    );
};

export default PageNotCreated;

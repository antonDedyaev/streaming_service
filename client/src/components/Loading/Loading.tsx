import { useTranslation } from 'next-i18next';
import styles from './Loading.module.scss';

const Loading = () => {
    const { t } = useTranslation('moviesPage');
    return (
        <div className={styles.container} data-testid={'loading'}>
            <div className={styles.spinner}>
                <div className={[styles.blob, styles.top].join(' ')}></div>
                <div className={[styles.blob, styles.bottom].join(' ')}></div>
                <div className={[styles.blob, styles.left].join(' ')}></div>

                <div className={[styles.blob, styles.move].join(' ')}></div>
            </div>
            {t('loading')}
        </div>
    );
};

export default Loading;

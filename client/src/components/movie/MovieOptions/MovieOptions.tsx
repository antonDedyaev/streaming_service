import styles from './MovieOptions.module.scss';
import TextBadge from '../../UI/badges/TextBadge/TextBadge';
import { useTranslation } from 'next-i18next';

const MovieOptions = () => {
    const { t } = useTranslation('movie');
    return (
        <div className={styles.container} data-testid={'options'}>
            <div className={styles.container__block}>
                <div className={styles.container__title}>{t('languages')}</div>
                <div className={styles.container__value}>{t('langVariant')}</div>
            </div>

            <div className={styles.container__block}>
                <div className={styles.container__title}>{t('subtitles')}</div>
                <div className={styles.container__value}>{t('subVariant')}</div>
            </div>

            <div className={styles.container__block}>
                <div className={[styles.container__title, styles.container__title_full].join(' ')}>
                    {t('quality')}
                    <span className={styles.container__quality}> {t('qualityDisclaimer')}</span>
                </div>

                <div className={[styles.container__title, styles.container__title_mobile].join(' ')}>
                    {t('qualityAdaptive')}
                </div>

                <div className={styles.container__badgesContainer}>
                    {['FullHD', 'HD', '1080', '720'].map((display) => (
                        <div key={display} className={styles.container__badge}>
                            <TextBadge text={display} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieOptions;

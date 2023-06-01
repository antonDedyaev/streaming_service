import styles from './MovieAppeal.module.scss';
import ShapedLinkUI from '@/components/UI/links/ShapedLink/ShapedLinkUI';
import { useTranslation } from 'next-i18next';

interface MovieAppealProps {
    title: string;
}

const MovieAppeal = ({ title }: MovieAppealProps) => {
    const { t } = useTranslation('movie');
    return (
        <div className={styles.container} data-testid="div-movieAppeal">
            <h2>
                {t('watch')} «{title}» {t('onAllDevices')}
            </h2>
            <p>{t('availableForDownload')}</p>
            <ShapedLinkUI
                className={styles.container__link}
                href="https://www.ivi.ru/devices"
                shape="rectangular"
                target="_blank"
            >
                {t('connectDevices')}
            </ShapedLinkUI>
        </div>
    );
};

export default MovieAppeal;

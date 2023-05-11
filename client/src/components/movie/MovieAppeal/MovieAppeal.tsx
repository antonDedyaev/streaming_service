import styles from './MovieAppeal.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import ShapedLinkUI from '@/components/UI/links/ShapedLink/ShapedLinkUI';
import { useTranslation } from 'next-i18next';

interface MovieAppealProps {
    movie: IMovie;
}

const MovieAppeal = ({ movie }: MovieAppealProps) => {
    const { t } = useTranslation('movie');
    return (
        <div className={styles.container} data-testid="div-movieAppeal">
            <h2>
                {t('watch')} «{movie.title}» {t('onAllDevices')}
            </h2>
            <p>{t('availableForDownload')}</p>
            <ShapedLinkUI className={styles.container__link} href="https://www.ivi.ru/devices" shape="rectangular">
                {t('connectDevices')}
            </ShapedLinkUI>
        </div>
    );
};

export default MovieAppeal;

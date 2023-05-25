import styles from './MovieRating.module.scss';
import ButtonUI from '../../UI/buttons/Button/ButtonUI';
import TextSquareUI from '../../UI/squares/TextSquareUI/TextSquareUI';
import { useTranslation } from 'next-i18next';
import IMovie from '@/models/IMovie';
import { declineWord } from '../../../utils/functions';

interface MovieRatingProps {
    movie: IMovie;
}

const MovieRating = ({ movie }: MovieRatingProps) => {
    const { t } = useTranslation('movie');
    return (
        <ButtonUI className={styles.container} background="transparentWhite">
            <div className={styles.container__value}>
                <TextSquareUI value={Number(movie.ratingKp.toFixed(1))} textSize="medium" />
            </div>

            <div className={styles.container__textContainer}>
                <h2 className={[styles.container__text, styles.container__text_rating].join(' ')}>
                    {t('movieRating')}
                </h2>
                <p className={[styles.container__text, styles.container__text_plot].join(' ')}>{t('hightlights')}</p>
                <p className={[styles.container__text, styles.container__text_marks].join(' ')}>
                    {`${new Intl.NumberFormat('ru-RU').format(movie.votesKp)} ${declineWord(movie.votesKp, [
                        t('userRate.0'),
                        t('userRate.1'),
                        t('userRate.2'),
                    ])}`}
                </p>
            </div>

            <div className={styles.container__estimate}>{t('rate')}</div>
        </ButtonUI>
    );
};

export default MovieRating;

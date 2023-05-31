import IMovie from '@/models/IMovie';
import styles from './PreviewPosterContentBrief.module.scss';
import { declineWord, firstCapitalLetter } from '@/utils/functions';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface PreviewPosterContentBriefProps {
    movie: IMovie;
    className?: string;
}

const PreviewPosterContentBrief = ({ movie, className }: PreviewPosterContentBriefProps) => {
    const { locale } = useRouter();
    const { t } = useTranslation('moviesPage');
    return (
        <div className={[styles.container, className].join(' ')}>
            {movie.ratingKp && (
                <div className={styles.container__rating}>
                    <span className={[styles.container__rating, styles.container__rating_integer].join(' ')}>
                        {`${movie.ratingKp.toFixed(1)}`.slice(0, 1)}
                    </span>
                    <span className={[styles.container__rating, styles.container__rating_fraction].join(' ')}>
                        {`${movie.ratingKp.toFixed(1)}`.slice(1, 3)}
                    </span>
                </div>
            )}
            <div className={styles.container__text}>
                <p>
                    {movie.year},{' '}
                    {locale === 'en' && movie.countries[0].enName ? movie.countries[0].enName : movie.countries[0].name}
                    , {firstCapitalLetter(locale === 'ru' ? movie.genres[0].name : movie.genres[0].enName)}
                </p>
                <p>{`${movie.movieLength} ${declineWord(movie.movieLength, [
                    t('minutes.0'),
                    t('minutes.1'),
                    t('minutes.2'),
                ])}`}</p>
            </div>
        </div>
    );
};

export default PreviewPosterContentBrief;

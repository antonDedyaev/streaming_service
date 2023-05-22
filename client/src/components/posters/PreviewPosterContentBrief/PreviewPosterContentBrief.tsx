import IMovie from '@/models/IMovie';
import styles from './PreviewPosterContentBrief.module.scss';
import { declineWord, firstCapitalLetter } from '@/utils/functions';

interface PreviewPosterContentBriefProps {
    movie: IMovie;
    className?: string;
}

const PreviewPosterContentBrief = ({ movie, className }: PreviewPosterContentBriefProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__rating}>
                <span className={[styles.container__rating, styles.container__rating_integer].join(' ')}>
                    {`${movie.ratingKp.toFixed(1)}`.slice(0, 1)}
                </span>
                <span className={[styles.container__rating, styles.container__rating_fraction].join(' ')}>
                    {`${movie.ratingKp.toFixed(1)}`.slice(1, 3)}
                </span>
            </div>
            <div className={[styles.container__text, className].join(' ')}>
                <p>
                    {movie.year}, {movie.countries[0].name}, {firstCapitalLetter(movie.genres[0].name)}
                </p>
                <p>{`${movie.movieLength} ${declineWord(movie.movieLength, ['минута', 'минуты', 'минут'])}`}</p>
            </div>
        </div>
    );
};

export default PreviewPosterContentBrief;

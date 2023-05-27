import IMovies from '@/models/IMovies';
import Image from 'next/image';
import bookmark from '../../../../public/icons/posters/bookmark.png';
import wand from '../../../../public/icons/posters/wand.png';
import star from '../../../../public/icons/posters/star.png';
import circle from '../../../../public/icons/posters/circle.png';
import styles from './PreviewPosterContent.module.scss';
import PreviewPosterContentBrief from '../PreviewPosterContentBrief/PreviewPosterContentBrief';
import IMovie from '@/models/IMovie';

interface PreviewPosterContentProps {
    movie: IMovies | IMovie;
}

const PreviewPosterContent = ({ movie }: PreviewPosterContentProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__icons}>
                <Image
                    className={[styles.container__icon, styles.container__icon_favorite].join(' ')}
                    src={bookmark}
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_similar].join(' ')}
                    src={wand}
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_rate].join(' ')}
                    src={star}
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_dislike].join(' ')}
                    src={circle}
                    alt="icon"
                />
            </div>

            <PreviewPosterContentBrief movie={movie as IMovie} className={styles.container__info} />
        </div>
    );
};

export default PreviewPosterContent;
/*<PreviewPosterContentBrief movie={movie as IMovie} className={styles.container__info} />*/
/*<div className={styles.container__info}>
                <div className={styles.container__rating}>
                    <span className={[styles.container__rating, styles.container__rating_integer].join(' ')}>
                        {`${movie.ratingKp}`.slice(0, 1)}
                    </span>
                    <span className={[styles.container__rating, styles.container__rating_fraction].join(' ')}>
                        {`${movie.ratingKp}`.slice(1, 3)}
                    </span>
                </div>
                <div className={styles.container__text}>
                    <p>
                        {movie.year}, {movie.countries[0].name}, {movie.genres[0].name}
                    </p>
                    <p>{movie.movieLength + ' ' + declineWord(movie.movieLength, ['минута', 'минуты', 'минут'])}</p>
                </div>
            </div>*/

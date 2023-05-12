import IMovie from '@/models/IMovie';
import PreviewPoster from '../PreviewPoster/PreviewPoster';
import RatingPoster from '../RatingPoster/RatingPoster';
import PromoPoster from '../PromoPoster/PromoPoster';
import styles from './PostersList.module.scss';

interface PostersListProps {
    posterType: 'preview' | 'rating' | 'promo';
    movies: IMovie[];
}

const PostersList = ({ posterType, movies }: PostersListProps) => {
    return (
        <>
            {movies.map(
                (movie, index) =>
                    (posterType === 'preview' && (
                        <PreviewPoster key={movie.name} className={styles.previewItem} movie={movie} />
                    )) ||
                    (posterType === 'rating' && (
                        <RatingPoster key={movie.name} className={styles.ratingItem} movie={movie} />
                    )) ||
                    (posterType === 'promo' && (
                        <PromoPoster key={movie.name} className={styles.promoItem} movie={movie} synopsis={index} />
                    )),
            )}
        </>
    );
};

export default PostersList;

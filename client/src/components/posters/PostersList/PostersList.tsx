import IMovie from '@/models/IMovie';
import PreviewPoster from '../PreviewPoster/PreviewPoster';
import RatingPoster from '../RatingPoster/RatingPoster';
import PromoPoster from '../PromoPoster/PromoPoster';
import styles from './PostersList.module.scss';
import IMovies from '@/models/IMovies';

interface PostersListProps {
    posterType: 'preview' | 'rating' | 'promo';
    movies: IMovies[] | IMovie[];
}

const PostersList = ({ posterType, movies }: PostersListProps) => {
    return (
        <>
            {movies.map(
                (movie, index) =>
                    (posterType === 'preview' && (
                        <PreviewPoster key={index} className={styles.previewItem} movie={movie as IMovies} />
                    )) ||
                    (posterType === 'rating' && (
                        <RatingPoster key={index} className={styles.ratingItem} movie={movie as IMovie} />
                    )) ||
                    (posterType === 'promo' && (
                        <PromoPoster key={index} className={styles.promoItem} movie={movie as IMovie} />
                    )),
            )}
        </>
    );
};

export default PostersList;

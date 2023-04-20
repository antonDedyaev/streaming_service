import IMovie from '@/models/IMovie';
import PreviewPoster from '../PreviewPoster/PreviewPoster';
import RatingPoster from '../RatingPoster/RatingPoster';
import PromoPoster from '../PromoPoster/PromoPoster';
import styles from './PostersList.module.scss';

interface PostersListProps {
    posterType: 'preview' | 'rating' | 'promo'
    movies: IMovie[]
}

const PostersList = ({ posterType, movies }: PostersListProps) => {
    return (
        <>
            {movies.map(movie => (
                posterType === 'preview' && <PreviewPoster className={styles.previewItem} movie={movie} /> ||
                posterType === 'rating' && <RatingPoster className={styles.ratingItem} movie={movie} /> ||
                posterType === 'promo' && <PromoPoster className={styles.promoItem} movie={movie} />
            ))}
        </>
    )
}

export default PostersList
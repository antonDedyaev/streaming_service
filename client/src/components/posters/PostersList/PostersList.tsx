import IMovie from '@/models/IMovie';
import PreviewPoster from '../PreviewPoster/PreviewPoster';
import RatingPoster from '../RatingPoster/RatingPoster';
import PromoPoster from '../PromoPoster/PromoPoster';
import style from './PostersList.module.scss';

interface PostersListProps {
    posterType: 'preview' | 'rating' | 'promo'
    movies: IMovie[]
    className: string
}

const PostersList = ({ posterType, movies, className }: PostersListProps) => {
    return (
        <>
            {movies.map(movie => (
                posterType === 'preview' && <PreviewPoster key={movie.name} className={className} movie={movie} /> ||
                posterType === 'rating' && <RatingPoster key={movie.name} className={className} movie={movie} /> ||
                posterType === 'promo' && <PromoPoster key={movie.name} className={className} movie={movie} />
            ))}
        </>
    )
}

export default PostersList
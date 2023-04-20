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
            <ul>
                {movies.map(movie => (
                    <li key={movie.name}>
                        {
                            posterType === 'preview' && <PreviewPoster className={className} movie={movie} /> ||
                            posterType === 'rating' && <RatingPoster className={className} movie={movie} /> ||
                            posterType === 'promo' && <PromoPoster className={className} movie={movie} />
                        }
                    </li>
                ))}
            </ul>
            
            <style jsx>
                {`
                    ul {
                        display: flex;
                    }
                `}
            </style>
        </>
    )
}

export default PostersList
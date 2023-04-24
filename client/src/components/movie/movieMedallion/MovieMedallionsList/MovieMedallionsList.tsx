import styles from './MovieMedallionsList.module.scss';
import MovieMedallionItem from '../MovieMedallionItem/MovieMedallionItem';
import { IMovie } from './Temp/IMovie';
import Link from 'next/link';
import TextSquareUI from '@/components/UI/squares/TextSquareUI/TextSquareUI';
import ImgSquareUI from '@/components/UI/squares/ImgSquareUI/ImgSquareUI';

interface MovieMedallionsListProps {
    className?: string;
    movie: IMovie;
}

const MovieMedallionsList = ({ className, movie }: MovieMedallionsListProps) => {
    return (
        <div className={[styles.content, className].join(' ').trim()}>
            <MovieMedallionItem text="Рейтинг" disabled={true}>
                <TextSquareUI value={movie.raiting} />
            </MovieMedallionItem>
            {movie.actors.map((actor) => (
                <Link href="/" key={actor.id}>
                    <MovieMedallionItem text={`${actor.firstName} ${actor.lastName}`}>
                        <ImgSquareUI actor={actor} />
                    </MovieMedallionItem>
                </Link>
            ))}
        </div>
    );
};

export default MovieMedallionsList;

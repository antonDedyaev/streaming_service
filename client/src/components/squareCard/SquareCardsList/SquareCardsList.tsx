import styles from './SquareCardsList.module.scss';
import SquareCard from '../SquareCard/SquareCard';
import { IMovie } from './Temp/IMovie';

interface SquareCardsListProps {
    className?: string;
    movie: IMovie;
}

const SquareCardsList = ({ className, movie }: SquareCardsListProps) => {
    return (
        <div className={[styles.content, className].join(' ').trim()}>
            <SquareCard disabled={true} mainValue={movie.raiting} caption={movie.nameraiting} />

            {movie.actors.map((actor) => (
                <SquareCard
                    key={actor.id}
                    href="/"
                    src={actor.img}
                    alt={actor.firstName}
                    caption={`${actor.firstName} ${actor.lastName}`}
                />
            ))}
        </div>
    );
};

export default SquareCardsList;

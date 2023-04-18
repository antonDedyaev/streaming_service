import Link from 'next/link';
import styles from './SquareCardsList.module.scss';
import Image from 'next/image';
import SquareCard from '../SquareCard/SquareCard';
import { IMovie } from './Temp/IMovie';

interface SquareCardsListProps {
  movie: IMovie;
}

const SquareCardsList = ({ movie }: SquareCardsListProps) => {
  return (
    <div className={styles.content}>
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

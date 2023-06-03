import styles from './MovieMedallionsList.module.scss';
import MovieMedallionItem from '../MovieMedallionItem/MovieMedallionItem';
import Link from 'next/link';
import TextSquareUI from '@/components/UI/squares/TextSquareUI/TextSquareUI';
import ImgSquareUI from '@/components/UI/squares/ImgSquareUI/ImgSquareUI';
import { useTranslation } from 'next-i18next';
import IMovie from '@/models/IMovie';
import { useRouter } from 'next/router';

interface MovieMedallionsListProps {
    className?: string;
    movie: IMovie;
}

const MovieMedallionsList = ({ className, movie }: MovieMedallionsListProps) => {
    const { t } = useTranslation('moviesPage');
    const { locale } = useRouter();
    const actors = movie.persons.filter((persons) => persons.enProfession.includes('actor'));
    return (
        <div className={[styles.content, className].join(' ').trim()} data-testid={'movieMedallionsList'}>
            <MovieMedallionItem text={t('filterPanel.rating')} disabled={true}>
                <TextSquareUI value={Number(movie.ratingKp.toFixed(1))} />
            </MovieMedallionItem>
            {actors.slice(0, 5).map((actor) => (
                <Link href={`/persons/${actor.id}`} key={actor.id}>
                    <MovieMedallionItem
                        text={
                            locale == 'ru'
                                ? actor.name
                                    ? actor.name
                                    : actor.enName
                                : actor.enName
                                ? actor.enName
                                : actor.name
                        }
                    >
                        <ImgSquareUI person={actor} />
                    </MovieMedallionItem>
                </Link>
            ))}
        </div>
    );
};

export default MovieMedallionsList;

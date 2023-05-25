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
    return (
        <div className={[styles.content, className].join(' ').trim()}>
            <MovieMedallionItem text={t('filterPanel.rating')} disabled={true}>
                <TextSquareUI value={Number(movie.ratingKp.toFixed(1))} />
            </MovieMedallionItem>
            {movie.persons.map((person) => (
                <Link href={`/persons/${person.id}`} key={person.id}>
                    <MovieMedallionItem text={locale == 'ru' ? person.name : person.enName}>
                        <ImgSquareUI person={person} />
                    </MovieMedallionItem>
                </Link>
            ))}
        </div>
    );
};

export default MovieMedallionsList;

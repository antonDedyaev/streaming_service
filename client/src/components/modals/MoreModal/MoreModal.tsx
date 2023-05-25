import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './MoreModal.module.scss';
import MoviePersonsItem from '@/components/movie/MoviePersonsItem/MoviePersonsItem';
import Link from 'next/link';
import Image from 'next/image';
import PreviewPosterContentBrief from '@/components/posters/PreviewPosterContentBrief/PreviewPosterContentBrief';
import { useTranslation } from 'next-i18next';
import IMovie from '@/models/IMovie';

interface MoreModalProps {
    movie: IMovie;
}

const MoreModal = ({ movie }: MoreModalProps) => {
    const { t } = useTranslation('movie');
    return (
        <ModalUI className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.container__inner}>
                    <h1 className={styles.container__title}>
                        {movie.name} (Фильм {movie.year})
                    </h1>
                    <MoviePersonsItem movie={movie} title={t('personsInvolved.0')} />
                    <MoviePersonsItem movie={movie} title={t('personsInvolved.1')} />
                </div>
                <div className={styles.container__poster}>
                    <Link href={`/movies/${movie.id}`}>
                        <Image
                            className={styles.container__posterImage}
                            src={movie.posterUrl}
                            alt={movie.name}
                            width={128}
                            height={196}
                        />
                    </Link>

                    <PreviewPosterContentBrief className={styles.container__posterBrief} movie={movie} />
                </div>
            </div>
        </ModalUI>
    );
};

export default MoreModal;

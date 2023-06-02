import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './MoreModal.module.scss';
import MoviePersonsItem from '@/components/movie/MoviePersonsItem/MoviePersonsItem';
import Image from 'next/image';
import PreviewPosterContentBrief from '@/components/posters/PreviewPosterContentBrief/PreviewPosterContentBrief';
import { useTranslation } from 'next-i18next';
import IMovie from '@/models/IMovie';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface MoreModalProps {
    movie: IMovie;
}

const MoreModal = ({ movie }: MoreModalProps) => {
    const { t } = useTranslation('movie');
    const router = useRouter();
    const { locale } = useRouter();
    const [isClose, setIsClose] = useState(false);
    const closeModal = (value: boolean) => {
        setIsClose(value);
    };

    const back = () => {
        setIsClose(true);
        router.back();
    };

    const directors = movie.persons.filter((persons) => persons.enProfession.includes('director'));
    const actors = movie.persons.filter((persons) => persons.enProfession.includes('actor'));
    const producers = movie.persons.filter((persons) => persons.enProfession.includes('producer'));
    const operators = movie.persons.filter((persons) => persons.enProfession.includes('operator'));
    const designers = movie.persons.filter((persons) => persons.enProfession.includes('designer'));
    const writers = movie.persons.filter((persons) => persons.enProfession.includes('writer'));
    const composers = movie.persons.filter((persons) => persons.enProfession.includes('composer'));
    const editors = movie.persons.filter((persons) => persons.enProfession.includes('editor'));
    const voice_actors = movie.persons.filter((persons) => persons.enProfession.includes('voice_actor'));

    return (
        <ModalUI className={styles.modal} close={isClose}>
            <div className={styles.container}>
                <div className={styles.container__inner}>
                    <h1 className={styles.container__title}>
                        {locale === 'ru'
                            ? `${movie.name ? movie.name : movie.enName} (Фильм ${movie.year})`
                            : `${movie.enName ? movie.enName : movie.name} (Movie ${movie.year})`}
                    </h1>
                    {directors.length > 0 && (
                        <MoviePersonsItem
                            persons={directors}
                            title={directors.length > 1 ? t('personsInvolved.0') : t('personInvolved.0')}
                            closeModal={closeModal}
                        />
                    )}
                    {actors.length > 0 && (
                        <MoviePersonsItem
                            persons={actors}
                            title={actors.length > 1 ? t('personsInvolved.1') : t('personInvolved.1')}
                            closeModal={closeModal}
                        />
                    )}
                    {producers.length > 0 && (
                        <MoviePersonsItem
                            persons={producers}
                            title={producers.length > 1 ? t('personsInvolved.2') : t('personInvolved.2')}
                            closeModal={closeModal}
                        />
                    )}
                    {operators.length > 0 && (
                        <MoviePersonsItem
                            persons={operators}
                            title={operators.length > 1 ? t('personsInvolved.3') : t('personInvolved.3')}
                            closeModal={closeModal}
                        />
                    )}
                    {designers.length > 0 && (
                        <MoviePersonsItem
                            persons={designers}
                            title={designers.length > 1 ? t('personsInvolved.4') : t('personInvolved.4')}
                            closeModal={closeModal}
                        />
                    )}
                    {writers.length > 0 && (
                        <MoviePersonsItem
                            persons={writers}
                            title={writers.length > 1 ? t('personsInvolved.5') : t('personInvolved.5')}
                            closeModal={closeModal}
                        />
                    )}
                    {composers.length > 0 && (
                        <MoviePersonsItem
                            persons={composers}
                            title={composers.length > 1 ? t('personsInvolved.6') : t('personInvolved.6')}
                            closeModal={closeModal}
                        />
                    )}
                    {editors.length > 0 && (
                        <MoviePersonsItem
                            persons={editors}
                            title={editors.length > 1 ? t('personsInvolved.7') : t('personInvolved.7')}
                            closeModal={closeModal}
                        />
                    )}
                    {voice_actors.length > 0 && (
                        <MoviePersonsItem
                            persons={voice_actors}
                            title={voice_actors.length > 1 ? t('personsInvolved.8') : t('personInvolved.8')}
                            closeModal={closeModal}
                        />
                    )}
                </div>
                <div className={styles.container__poster}>
                    <Image
                        className={styles.container__posterImage}
                        src={movie.posterUrl}
                        alt={`${movie.name} ${movie.enName}`}
                        width={128}
                        height={196}
                        onClick={() => back()}
                    />
                    <PreviewPosterContentBrief className={styles.container__posterBrief} movie={movie} />
                </div>
            </div>
        </ModalUI>
    );
};

export default MoreModal;

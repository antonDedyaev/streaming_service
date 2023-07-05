import { useRouter } from 'next/router';
import styles from '../../styles/pages/EditItemsPage.module.scss';
import { GetStaticProps } from 'next';
import IGenre from '@/models/IGenre';
import EditForm from '@/components/EditForm/EditForm';
import ArrowButton from '@/components/UI/buttons/ArrowButton/ArrowButtonUI';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import fetchFromEndpoint from '@/utils/fetcher';
import { mockGenres } from '../api/mocks/mockGenresAndCountries';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['adminPage'])),
        },
    };
};

const GenreEditPage = () => {
    const { t } = useTranslation('adminPage');
    const router = useRouter();

    const genres: IGenre[] = fetchFromEndpoint('namesgenres') ?? mockGenres.slice();
    const sortedGenres = genres.sort((a, b) => a.id - b.id);

    return (
        <div className={styles.container}>
            <div className={styles.container__content}>
                <div className={styles.container__header}>
                    <span>{t('editing.backButton')}</span>
                    <ArrowButton
                        className={styles.container__headerArrow}
                        direction="left"
                        iconSize="medium"
                        onClick={() => router.back()}
                    />
                    <h1>{t('editing.editGenres')}</h1>
                </div>
                <ul>
                    {sortedGenres.map((genre, index) => (
                        <li key={index}>
                            <EditForm deletable={false} item={genre} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default GenreEditPage;

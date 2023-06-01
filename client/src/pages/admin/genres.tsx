import { useRouter } from 'next/router';
import styles from '../../styles/pages/EditItemsPage.module.scss';
import { GetStaticProps } from 'next';
import axios from 'axios';
import IGenre from '@/models/IGenre';
import EditForm from '@/components/EditForm/EditForm';
import ArrowButton from '@/components/UI/buttons/ArrowButton/ArrowButtonUI';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const response = await axios.get('http://localhost:6125/namesgenres');
    const genres = response.data;

    return {
        props: {
            genres,
            ...(await serverSideTranslations(locale!, ['adminPage'])),
        },
    };
};

const GenreEditPage = ({ genres }: { genres: IGenre[] }) => {
    const { t } = useTranslation('adminPage');
    const router = useRouter();

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
                    {genres.map((genre, index) => (
                        <li key={index}>
                            <EditForm item={genre} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default GenreEditPage;

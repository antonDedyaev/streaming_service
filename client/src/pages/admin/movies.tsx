import { useRouter } from 'next/router';
import styles from '../../styles/pages/EditItemsPage.module.scss';
import { GetStaticProps } from 'next';
import EditForm from '@/components/EditForm/EditForm';
import ArrowButton from '@/components/UI/buttons/ArrowButton/ArrowButtonUI';
import IMovies from '@/models/IMovies';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fetchFromEndpoint from '@/utils/fetcher';

interface IMovieEditable {
    id: number;
    name: string;
    enName: string;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const response = await fetch(`${process.env.API_HOST}/movies`);
        const data = await response.json();

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                allMovies: data,
                ...(await serverSideTranslations(locale!, ['adminPage'])),
            },
        };
    } catch {
        return {
            props: {
                allMovies: null,
            },
        };
    }
};

const MovieEditPage = ({ allMovies }: { allMovies: IMovies[] }) => {
    const { t } = useTranslation('adminPage');
    const router = useRouter();
    const [shownMoviesLimit, setShownMoviesLimit] = useState(50);
    const [searchInput, setSearchInput] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<IMovieEditable[]>([]);

    const movies: IMovies[] = fetchFromEndpoint('filmswithinfo') ?? allMovies;
    const mappedMovies = movies
        ? movies.map((item: IMovies) => {
              return { id: item.id, name: item.name, enName: item.enName };
          })
        : [];

    const sortedMovies = mappedMovies.sort((a, b) => (a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0));

    const handleSearchClicked = () => {
        const searchResults = movies.filter((movie) => {
            return (
                (movie.name && movie.name.toLowerCase().includes(searchInput.toLowerCase())) ||
                (movie.enName && movie.enName.toLowerCase().includes(searchInput.toLowerCase()))
            );
        });

        setFilteredMovies(searchResults);
        setSearchInput('');
    };

    const handleResetClicked = () => {
        setFilteredMovies([]);
        setSearchInput('');
    };

    const renderedList = filteredMovies.length === 0 ? sortedMovies : filteredMovies;

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
                    <h1>{t('editing.editMovies')}</h1>
                </div>
                <div className={styles.container__searchField}>
                    <input
                        type="text"
                        placeholder={t('editing.inputName')!}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <BorderedButton
                        size="medium"
                        className={styles.container__searchButton}
                        onClick={handleSearchClicked}
                    >
                        {t('editing.search')}
                    </BorderedButton>
                    <BorderedButton
                        size="medium"
                        className={styles.container__resetButton}
                        onClick={handleResetClicked}
                    >
                        {t('editing.reset')}
                    </BorderedButton>
                </div>
                <ul>
                    {renderedList.slice(0, shownMoviesLimit).map((movie, index) => (
                        <li key={index}>
                            <EditForm deletable={true} item={movie} />
                        </li>
                    ))}
                    {renderedList.length > shownMoviesLimit && (
                        <BorderedButton
                            size="large"
                            className={styles.container__paginationButton}
                            onClick={() => setShownMoviesLimit(shownMoviesLimit + 50)}
                        >
                            {t('editing.showMore')}
                        </BorderedButton>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default MovieEditPage;

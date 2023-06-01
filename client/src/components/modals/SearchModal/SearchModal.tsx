import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './SearchModal.module.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ModalInputUI from '@/components/UI/ModalInput/ModalInputUI';
import SearchMovieLink from '@/components/UI/links/SearchMovieLink/SearchMovieLink';
import { useTranslation } from 'next-i18next';
import IMovies from '@/models/IMovies';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import axios from 'axios';

const SearchModal = () => {
    const { t } = useTranslation('modals');
    const { locale } = useRouter();
    const [value, setValue] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);
    const [searchMovies, setSearchMovies] = useState<IMovies[]>();
    const [isClose, setIsClose] = useState(false);
    const [movies, setMovies] = useState<IMovies[]>();

    useMemo(() => {
        const getMovies = async () => {
            try {
                const requestPerson = await axios.get(`http://localhost:6125/filmswithinfo`);
                setMovies(requestPerson.data);
            } catch (e: any) {
                console.log(e.response?.data?.message);
            }
        };
        getMovies();
    }, []);

    const inputWrapperRef = useRef(null);

    const clickHandler = (event: React.MouseEvent) => {
        const inputWrapper: HTMLDivElement = inputWrapperRef.current!;

        if (inputWrapper.firstElementChild === event.target) {
            setFocus(true);
        } else {
            setFocus(false);
        }
    };

    useEffect(() => {
        if (movies) {
            if (locale === 'ru') {
                setSearchMovies(
                    movies.filter((movie) => movie.name?.toLowerCase().includes(value.toLowerCase())).slice(0, 10),
                );
            } else {
                setSearchMovies(
                    movies.filter((movie) => movie.enName?.toLowerCase().includes(value.toLowerCase())).slice(0, 10),
                );
            }
        }
    }, [value]);

    return (
        <ModalUI close={isClose}>
            <div className={styles.container} onClick={(event) => clickHandler(event)}>
                <div className={styles.container__header}>
                    <h2 className={styles.container__title}>{t('searchModal.search')}</h2>

                    <div className={styles.container__inputWrapper} ref={inputWrapperRef}>
                        <ModalInputUI
                            focus={focus}
                            type="search"
                            inputType="string"
                            placeholder={t('searchModal.moviesSearch')}
                            value={value}
                            onChange={(value) => setValue(value)}
                            onClick={() => setValue('')}
                        />
                    </div>
                </div>

                <div className={styles.container__content}>
                    {searchMovies?.map((movie) => (
                        <SearchMovieLink
                            key={movie.id}
                            href={`/movies/${movie.id}`}
                            name={locale === 'ru' ? movie.name : movie.enName}
                            year={movie.year}
                            value={value}
                            onClick={() => setIsClose(true)}
                        />
                    ))}
                </div>
            </div>
        </ModalUI>
    );
};

export default SearchModal;

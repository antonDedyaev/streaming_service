import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import styles from '@/styles/pages/CardPersonPage.module.scss';
import ImgSquareUI from '@/components/UI/squares/ImgSquareUI/ImgSquareUI';
import FilmographySection from '@/components/sections/FilmographySection/FilmographySection';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import IPerson from '@/models/IPerson';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageNotCreated from '@/components/PageNotCreated/PageNotCreated';
import Loading from '@/components/Loading/Loading';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { firstCapitalLetter, professionInTheSingular } from '@/utils/functions';
import { getDataFromLocalStorage, getGenresAndCountries } from '@/store/ActionCreators';
import { useAppDispatch } from '@/store/hooks/redux';
import Image from 'next/image';
import fetchFromEndpoint from '@/utils/fetcher';
import { allPersons } from '../api/mocks/mockPersons';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'collection',
                'common',
                'footer',
                'header',
                'mainPage',
                'modals',
                'moviesPage',
                'movie',
                'person',
            ])),
        },
    };
};

const CardActorPage = () => {
    const { t } = useTranslation(['person', 'moviesPage']);
    const dispatch = useAppDispatch();
    const { query, locale, asPath, isReady, back } = useRouter();

    const [loading, setLoading] = useState(true);

    const person: IPerson =
        fetchFromEndpoint(`personswithinfo/${query.id}`) ?? allPersons.find(({ id }) => String(id) === query.id);

    useEffect(() => {
        isReady && setLoading(false);
    }, []);

    useEffect(() => {
        dispatch(getGenresAndCountries());
        dispatch(getDataFromLocalStorage());
    }, [locale, asPath]);

    const converToString = (array: string[], version: 'en' | 'ru') => {
        if (version === 'ru') {
            return array.map((item) => professionInTheSingular(item)).join(', ');
        }
        if (version === 'en')
            return array
                .map((item) => {
                    if (item === 'voice_actor') {
                        return 'Voice actor';
                    }
                    return firstCapitalLetter(item);
                })
                .join(', ');
    };

    return (
        <MainContainer
            keywords={['person']}
            title={
                loading
                    ? `${t('loading', { ns: 'moviesPage' })}`
                    : person
                    ? locale === 'ru'
                        ? `${person.name ? person.name : person.enName}${
                              person.name ? (person.enName ? ` (${person.enName})` : '') : ''
                          }: ${t('browserTab')}. ${converToString(person.profession, 'ru')}.`
                        : `${person.enName ? person.enName : person.name}${
                              person.enName ? (person.name ? ` (${person.name})` : '') : ''
                          }: ${t('browserTab')}. ${converToString(person.enProfession, 'en')}.`
                    : `${t('pageError', { ns: 'moviesPage' })}`
            }
            page="other"
        >
            {loading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : person ? (
                <div className="container">
                    <div className={styles.back} onClick={() => back()}>
                        <Image src="/icons/arrows/arrow_left.svg" alt="arrow left" height={40} width={40} />
                        {t('person:back')}
                    </div>

                    <div className={styles.container}>
                        <section className={[styles.container__info, styles.info].join(' ')}>
                            {person.photo && (
                                <div className={styles.info__img}>
                                    <ImgSquareUI person={person} border="medium" />
                                </div>
                            )}
                            <h1 className={styles.info__title}>
                                {locale === 'ru'
                                    ? person.name
                                        ? person.name
                                        : person.enName
                                    : person.enName
                                    ? person.enName
                                    : person.name}
                            </h1>
                            {locale === 'en' && person.enName && (
                                <span className={styles.info__alternate}>{person.name}</span>
                            )}
                            {locale === 'ru' && person.name && (
                                <span className={styles.info__alternate}>{person.enName}</span>
                            )}
                        </section>
                        {person.movies && (
                            <section className={styles.container__filmography}>
                                <FilmographySection movies={person.movies} />
                            </section>
                        )}
                        <section className={styles.container__breadcrumbs}>
                            <Breadcrumbs
                                path={asPath.split('/').slice(1)}
                                type="slash"
                                tailName={{
                                    name: person.name ? person.name : person.enName,
                                    enName: person.enName ? person.enName : person.name,
                                }}
                            />
                        </section>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <PageNotCreated />
                </div>
            )}
        </MainContainer>
    );
};

export default CardActorPage;

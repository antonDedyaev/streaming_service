import CardLink from '@/components/UI/links/CardLink/CardLink';
import styles from '../../styles/pages/AdminPage.module.scss';
import backArrow from '../../../public/icons/arrows/back-arrow.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getDataFromLocalStorage, getRefreshToken, validateUser } from '@/store/ActionCreators';
import ValidationModal from '@/components/modals/ValidationModal/ValidationModal';
import PageNotCreated from '@/components/PageNotCreated/PageNotCreated';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['adminPage', 'modals', 'moviesPage'])),
        },
    };
};

const AdminPage = () => {
    const { t } = useTranslation('adminPage');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const currentLocale = router.locale === 'ru' ? 'en' : 'ru';
    const { error, user } = useAppSelector((state) => state.user);
    const queryParams = Object.keys(router.query);

    useEffect(() => {
        dispatch(getDataFromLocalStorage());
        const validate = async () => {
            console.log(localStorage.getItem('authorization'));
            if (localStorage.getItem('accessToken') && localStorage.getItem('currentUser')) {
                console.log('fetchToken', localStorage.getItem('accessToken'));
                const refreshToken = await getRefreshToken(
                    localStorage.getItem('accessToken')!,
                    localStorage.getItem('authorization')!,
                );

                dispatch(
                    validateUser(
                        localStorage.getItem('accessToken') || '',
                        refreshToken || '',
                        localStorage.getItem('authorization')!,
                    ),
                );
            }
        };
        validate();
    }, []);

    useEffect(() => {
        if (error === 'Internal server error') {
            router.push(
                {
                    pathname: `/`,
                    query: { validation: '' },
                },
                undefined,
                { shallow: true },
            );
        }
    }, [error]);

    return (
        <div className={styles.container}>
            {user?.role === 'admin' ? (
                <div className={styles.container__content}>
                    <h1>{t('adminMode')}</h1>

                    <Link href={router.asPath} locale={currentLocale} className={styles.container__locale}>
                        {currentLocale}
                    </Link>
                    <div className={styles.container__links}>
                        <CardLink href="" onClick={() => router.back()}>
                            <Image src={backArrow} height={20} width={20} alt="Стрелка назад" />
                        </CardLink>
                        <CardLink href="admin/movies">{t('movies')}</CardLink>
                        <CardLink href="admin/genres">{t('genres')}</CardLink>
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.container__content}>
                        <PageNotCreated showButton={false} />
                    </div>
                </div>
            )}

            {queryParams.includes('validation') && <ValidationModal />}
        </div>
    );
};
export default AdminPage;

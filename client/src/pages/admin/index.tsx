import CardLink from '@/components/UI/links/CardLink/CardLink';
import styles from '../../styles/pages/AdminPage.module.scss';
import backArrow from '../../../public/icons/arrows/back-arrow.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['adminPage'])),
        },
    };
};

const AdminPage = () => {
    const { t } = useTranslation('adminPage');
    const router = useRouter();
    const currentLocale = router.locale === 'ru' ? 'en' : 'ru';
    return (
        <div className={styles.container}>
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
        </div>
    );
};
export default AdminPage;

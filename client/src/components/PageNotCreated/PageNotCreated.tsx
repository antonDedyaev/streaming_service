import { useRouter } from 'next/router';
import BorderedButton from '../UI/buttons/BorderedButton/BorderedButton';
import styles from './PageNotCreated.module.scss';
import { useTranslation } from 'next-i18next';
import attentionIcon from '../../../public/icons/attention.svg';
import Image from 'next/image';

interface PageNotCreatedProps {
    showButton?: boolean;
}

const PageNotCreated = ({ showButton = true }: PageNotCreatedProps) => {
    const router = useRouter();
    const { t } = useTranslation('moviesPage');
    return (
        <div className={styles.container} data-testid={'pageNotCreated'}>
            <Image src={attentionIcon} alt="Внимание" />
            <p>{t('pageError')}</p>
            {showButton && (
                <BorderedButton size="medium" className={styles.button} onClick={() => router.back()}>
                    {t('buttonBack')}
                </BorderedButton>
            )}
        </div>
    );
};

export default PageNotCreated;

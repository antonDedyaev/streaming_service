import Image from 'next/image';
import IMovie from '@/models/IMovie';
import topIcon from '../../../../public/icons/posters/top10.svg';
import styles from './TopTenSection.module.scss';
import Slider from '@/components/Slider/Slider';
import PostersList from '@/components/posters/PostersList/PostersList';
import { useTranslation } from 'next-i18next';

interface TopTenSectionProps {
    movies: IMovie[];
}

const TopTenSection = ({ movies }: TopTenSectionProps) => {
    const { t } = useTranslation('mainPage');
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <Image className={styles.topIcon} src={topIcon} alt="топ 10" />
                <h3 className={styles.section__title}>{t('weekTop')}</h3>
            </div>

            <div className={styles.section__content}>
                <Slider itemType="rating" length={movies.length}>
                    <PostersList posterType="rating" movies={movies} />
                </Slider>
            </div>
        </div>
    );
};

export default TopTenSection;

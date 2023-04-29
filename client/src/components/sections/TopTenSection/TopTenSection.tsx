import Image from 'next/image';
import IMovie from '@/models/IMovie';
import topIcon from '../../../../public/icons/posters/top10.svg';
import styles from './TopTenSection.module.scss';
import Slider from '@/components/Slider/Slider';
import PostersList from '@/components/posters/PostersList/PostersList';

interface TopTenSectionProps {
    movies: IMovie[]
}

const TopTenSection = ({ movies }: TopTenSectionProps) => {
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <Image className={styles.topIcon} src={topIcon} alt='топ 10' />
                <h3>за неделю</h3>
            </div>

            <div className={styles.section__content}>
                <Slider itemType='rating' length={movies.length} >
                    <PostersList posterType='rating' movies={movies} />
                </Slider>
            </div>
        </div>
    )
}

export default TopTenSection;
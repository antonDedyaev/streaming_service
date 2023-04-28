import Slider from '@/components/Slider/Slider';
import styles from './MoviesSection.module.scss';
import IMovie from '@/models/IMovie';
import arrow from '../../../../public/icons/arrows/arrow_right.svg'
import Link from 'next/link';
import Image from 'next/image';
import PostersList from '@/components/posters/PostersList/PostersList';

interface MoviesSectionProps {
    title: string,
    movies: IMovie[],
    href: string
}

const MoviesSection = ({ title, movies, href }: MoviesSectionProps) => {
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <Link className={styles.section__link} href={href}>
                    <h3>{title}</h3>
                    <Image className={styles.arrow} src={arrow} alt='' />
                </Link>
            </div>
            

            <div className={styles.section__content}>
                <Slider itemType='preview' length={movies.length} >
                    <PostersList posterType='preview' movies={movies} />
                </Slider>
            </div>
        </div>
    )
}

export default MoviesSection;
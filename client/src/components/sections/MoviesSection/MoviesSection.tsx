import Slider from '@/components/Slider/Slider';
import IMovie from '@/models/IMovie';
import PostersList from '@/components/posters/PostersList/PostersList';
import ArrowedLink from '@/components/UI/links/ArrowedLink/ArrowedLink';
import styles from './MoviesSection.module.scss';

interface MoviesSectionProps {
    title: string;
    movies: IMovie[];
    href: string;
}

const MoviesSection = ({ title, movies, href }: MoviesSectionProps) => {
    const onClick = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                {href ? (
                    <ArrowedLink text={title} href={href} onClick={onClick} />
                ) : (
                    <h3 className={styles.section__title}>{title}</h3>
                )}
            </div>

            <div className={styles.section__content}>
                <Slider itemType="preview" length={movies.length}>
                    <PostersList posterType="preview" movies={movies} />
                </Slider>
            </div>
        </div>
    );
};

export default MoviesSection;

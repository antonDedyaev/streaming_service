import Slider from '@/components/Slider/Slider';
import IMovies from '@/models/IMovies';
import PostersList from '@/components/posters/PostersList/PostersList';
import ArrowedLink from '@/components/UI/links/ArrowedLink/ArrowedLink';
import styles from './MoviesSection.module.scss';
import CardLink from '@/components/UI/links/CardLink/CardLink';

interface MoviesSectionProps {
    title: string;
    movies: IMovies[];
    href: string;
    showAllLink?: boolean;
}

const MoviesSection = ({ title, movies, href, showAllLink = true }: MoviesSectionProps) => {
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                {href ? <ArrowedLink text={title} href={href} /> : <h3 className={styles.section__title}>{title}</h3>}
            </div>

            <div className={styles.section__content}>
                <Slider itemType="preview" length={movies.length + 1}>
                    <PostersList posterType="preview" movies={movies} />
                    {showAllLink && <CardLink href={href}>Посмотреть все</CardLink>}
                </Slider>
            </div>
        </div>
    );
};

export default MoviesSection;

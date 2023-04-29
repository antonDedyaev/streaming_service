import Image from 'next/image';
import styles from './SearchMovieLink.module.scss';
import Link from 'next/link';
import movieIcon from '../../../../../public/icons/movie/movie.svg'

interface SearchMovieItemProps {
    href: string;
    name: string;
    year: number;
}

const SearchMovieItem = ({ href, name, year }: SearchMovieItemProps) => {
    return (
        <Link className={styles.container} href={href}>
            <Image className={styles.container__icon} src={movieIcon} alt="" />

            <div className={styles.container__description}>
                <h2 className={styles.container__name}>{name}</h2>
                <p className={styles.container__year}>{year}</p>
            </div>
        </Link>
    );
};

export default SearchMovieItem;

import Image from 'next/image';
import styles from './SearchMovieLink.module.scss';
import Link from 'next/link';
import movieIcon from '../../../../../public/icons/movie/movie.svg';

interface SearchMovieItemProps {
    href: string;
    name: string;
    year: number;
    value: string;
    onClick?: (e: any) => void;
}

const SearchMovieItem = ({ href, name, year, value, onClick }: SearchMovieItemProps) => {
    let starOfLine = name.toLowerCase().indexOf(value.toLowerCase());
    let start = name.slice(0, starOfLine);
    let search = name.slice(starOfLine, starOfLine + value.length);
    let end = name.slice(starOfLine + value.length);

    return (
        <Link className={styles.container} href={href} onClick={onClick}>
            <Image className={styles.container__icon} src={movieIcon} alt="" />

            <div className={styles.container__description}>
                <h2 className={styles.container__name}>
                    {start}
                    <span>{search}</span>
                    {end}
                </h2>
                <p className={styles.container__year}>{year}</p>
            </div>
        </Link>
    );
};

export default SearchMovieItem;

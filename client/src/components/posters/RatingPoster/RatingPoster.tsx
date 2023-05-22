import Image from 'next/image';
import Link from 'next/link';
import style from './RatingPoster.module.scss';
import IMovie from '@/models/IMovie';
import { IRatingMovie } from './ratingMovies.data';

interface RatingPosterProps {
    movie: IRatingMovie;
    className: string;
}

const RatingPoster = ({ movie, className }: RatingPosterProps) => {
    return (
        <div className={[style.container, className].join(' ')}>
            <Link href="/">
                <div className={style.container__imageWrapper}>
                    <Image className={style.container__image} fill src={movie.posterUrl} alt={movie.name} />
                    <div className={style.container__fadeArea}></div>
                </div>
                <div className={style.container__content}>
                    <div className={style.container__fadeArea}></div>

                    <div className={style.container__logoWrapper}>
                        <Image
                            className={style.container__logo}
                            width={153}
                            height={40}
                            src={movie.logo!}
                            alt={movie.name}
                        />
                    </div>

                    <div className={style.container__numberWrapper}>
                        <Image
                            className={style.container__placeNumber}
                            width={48}
                            height={66}
                            src={`https://solea-parent.dfs.ivi.ru/picture/bypass/number${movie.place}.svg`}
                            alt={`${movie.place}`}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RatingPoster;

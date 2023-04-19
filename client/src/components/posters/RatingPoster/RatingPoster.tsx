import Image from "next/image";
import Link from "next/link";
import style from './RatingPoster.module.scss';
import { IRatingFilm } from "../PostersList/RatingPostersList/RatingPostersList";

interface RatingPosterProps {
    film: IRatingFilm
    className: string
}

function RatingPoster({ film, className }: RatingPosterProps) {
    return (
        <div className={[style.ratingPoster, className].join(' ')}>
            <Link href="/">
                <div className={style.imageWrapper}>
                    <Image
                        className={style.ratingPoster__image}
                        width={200}
                        height={410}
                        src={film.image} 
                        alt={film.name} />
                    <div className={style.fadeArea}></div>
                </div>
                <div className={style.contentWrapper}>
                    <div className={style.fadeArea}></div>
                    <Image
                        className={style.logo}
                        width={153}
                        height={40}
                        src={film.logo}
                        alt={film.name} />
                    <Image 
                        className={style.placeNumber}
                        width={48}
                        height={66}
                        src={`https://solea-parent.dfs.ivi.ru/picture/bypass/number${film.place}.svg`}
                        alt={`${film.place}`} />    
                </div>
            </Link>
        </div>
    )
}

export default RatingPoster;
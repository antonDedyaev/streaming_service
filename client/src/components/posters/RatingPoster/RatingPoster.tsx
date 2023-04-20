import Image from "next/image";
import Link from "next/link";
import style from './RatingPoster.module.scss';
import IMovie from "@/models/IMovie";

interface RatingPosterProps {
    movie: IMovie
    className: string
}

const RatingPoster = ({ movie, className }: RatingPosterProps) => {
    return (
        <div className={[style.ratingPoster, className].join(' ')}>
            <Link href="/">
                <div className={style.imageWrapper}>
                    <Image
                        className={style.ratingPoster__image}
                        width={200}
                        height={410}
                        src={movie.image} 
                        alt={movie.name} />
                    <div className={style.fadeArea}></div>
                </div>
                <div className={style.contentWrapper}>
                    <div className={style.fadeArea}></div>
                    <Image
                        className={style.logo}
                        width={153}
                        height={40}
                        src={movie.logo}
                        alt={movie.name} />
                    <Image 
                        className={style.placeNumber}
                        width={48}
                        height={66}
                        src={`https://solea-parent.dfs.ivi.ru/picture/bypass/number${movie.place}.svg`}
                        alt={`${movie.place}`} />    
                </div>
            </Link>
        </div>
    )
}

export default RatingPoster;
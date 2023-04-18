import Image from "next/image";
import Link from "next/link";
import style from './RatingPoster.module.scss';

interface RatingPosterProps {
    className: string
}

function RatingPoster({ className }: RatingPosterProps) {
    return (
        <div className={[style.ratingPoster, className].join(' ')}>
            <Link href="/">
                <div className={style.imageWrapper}>
                    <Image
                        className={style.ratingPoster__image}
                        width={200}
                        height={410}
                        src="https://thumbs.dfs.ivi.ru/storage28/contents/d/e/f3afc43a0709ea1ebf35cdf142cc46.jpg/304x620//?q=85" 
                        alt="семья" />
                    <div className={style.fadeArea}></div>
                </div>
                <div className={style.contentWrapper}>
                    <div className={style.fadeArea}></div>
                    <Image
                        className={style.logo}
                        width={153}
                        height={33}
                        src="https://thumbs.dfs.ivi.ru/storage9/contents/d/e/14ad136916cb3797041ef18a0b6149.png/x200/?q=85"
                        alt="семья" />
                    <Image 
                        className={style.placeNumber}
                        width={48}
                        height={66}
                        src="https://solea-parent.dfs.ivi.ru/picture/bypass/number4.svg"
                        alt="4" />    
                </div>
            </Link>
        </div>
    )
}

export default RatingPoster;
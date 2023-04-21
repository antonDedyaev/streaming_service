import Image from "next/image";
import Link from "next/link";
import style from './PromoPoster.module.scss';
import IMovie from "@/models/IMovie";
import ButtonUI from "@/components/UI/Button/ButtonUI";

interface PromoPosterProps {
    movie: IMovie
}

const PromoPoster = ({ movie }: PromoPosterProps) => {
    return (
        <div className={style.promoPoster}>
            <Image
                className={style.promoPoster__image}
                src={movie.image}
                alt={movie.name}
                fill />
            <Link className={style.promoPoster__link} href="/">
                <div className={style.promoPoster__content}>
                    <div className={style.promoPoster__logoContainer}>
                        <Image
                            className={style.logo}
                            src={movie.logo}
                            alt={movie.name}
                            width={486}
                            height={100} />
                    </div>
                    <div className={style.promoPoster__synopsis}>
                        {movie.synopsis}
                    </div>
                </div>
                <div className={style.promoPoster__buttonContainer}>
                    <ButtonUI
                        className={style.button}
                        background="lightRed"
                        variant="large"
                    >
                        Смотреть
                    </ButtonUI>
                </div>
            </Link>
        </div>
    )
}

export default PromoPoster;
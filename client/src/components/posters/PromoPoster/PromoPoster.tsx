import Image from "next/image";
import Link from "next/link";
import style from './PromoPoster.module.scss';
import IPromoFilm from "@/models/IPromoFilm";
import ButtonUI from "@/components/UI/Button/ButtonUI";

interface PromoPosterProps {
    film: IPromoFilm
    className: string
}

const PromoPoster = ({ film, className }: PromoPosterProps) => {
    return (
        <div className={[style.promoPoster, className].join(' ')}>
            <Image
                className={style.promoPoster__image}
                src={film.image}
                alt={film.name}
                width={1216}
                height={524} />
            <Link className={style.promoPoster__link} href="/">
                <div className={style.promoPoster__content}>
                    <div className={style.promoPoster__logoContainer}>
                        <Image
                            className={style.logo}
                            src={film.logo}
                            alt={film.name}
                            width={486}
                            height={100} />
                    </div>
                    <div className={style.promoPoster__synopsis}>
                        {film.synopsis}
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
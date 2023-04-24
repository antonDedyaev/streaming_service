import Image from 'next/image';
import Link from 'next/link';
import style from './PromoPoster.module.scss';
import IMovie from '@/models/IMovie';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';

interface PromoPosterProps {
<<<<<<< HEAD
    movie: IMovie
=======
    movie: IMovie;
    className: string;
>>>>>>> 37ed72bf44eb000f8e268d6f8445e03a95f71398
}

const PromoPoster = ({ movie }: PromoPosterProps) => {
    return (
<<<<<<< HEAD
        <div className={style.promoPoster}>
            <Image
                className={style.promoPoster__image}
                src={movie.image}
                alt={movie.name}
                fill />
            <Link className={style.promoPoster__link} href="/">
                <div className={style.promoPoster__content}>
                    <div className={style.promoPoster__logoContainer}>
=======
        <div className={[style.container, className].join(' ')}>
            <div className={[style.container__imageWrapper, style.container__imageWrapper_background].join(' ')}>
                <Image
                    className={[style.container__image, style.container__image_background].join(' ')}
                    src={movie.image}
                    alt={movie.name}
                    fill
                />
            </div>
            <Link className={style.container__link} href="/">
                <div className={style.container__content}>
                    <div className={[style.container__imageWrapper, style.container__imageWrapper_logo].join(' ')}>
>>>>>>> 37ed72bf44eb000f8e268d6f8445e03a95f71398
                        <Image
                            className={[style.container__image, style.container__image_logo].join(' ')}
                            src={movie.logo}
                            alt={movie.name}
                            fill
                        />
                    </div>
                    <div className={style.container__synopsis}>{movie.synopsis}</div>
                </div>
                <ButtonUI className={style.container__button} background="lightRed" shape="large">
                    Смотреть
                </ButtonUI>
            </Link>
        </div>
    );
};

export default PromoPoster;

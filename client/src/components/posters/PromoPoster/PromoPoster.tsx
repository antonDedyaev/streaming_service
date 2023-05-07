import Image from 'next/image';
import Link from 'next/link';
import style from './PromoPoster.module.scss';
import IMovie from '@/models/IMovie';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';

interface PromoPosterProps {
    movie: IMovie;
    className: string;
}

const PromoPoster = ({ movie, className }: PromoPosterProps) => {
    return (
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
                        <Image
                            className={[style.container__image, style.container__image_logo].join(' ')}
                            src={movie.logo}
                            alt={movie.name}
                            fill
                        />
                    </div>
                    <div className={style.container__synopsis}>{movie.synopsis}</div>
                </div>
                <ColoredButton size='large' color='red' className={style.container__button}>
                    Смотреть
                </ColoredButton>
            </Link>
        </div>
    );
};

export default PromoPoster;

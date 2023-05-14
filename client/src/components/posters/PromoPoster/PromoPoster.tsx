import Image from 'next/image';
import Link from 'next/link';
import style from './PromoPoster.module.scss';
import IMovie from '@/models/IMovie';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';

interface PromoPosterProps {
    movie: IMovie;
    className: string;
    synopsis?: number;
}

const PromoPoster = ({ movie, className, synopsis }: PromoPosterProps) => {
    const { t } = useTranslation(['common', 'mainPage']);
    return (
        <div className={[style.container, className].join(' ')}>
            <div className={[style.container__imageWrapper, style.container__imageWrapper_background].join(' ')}>
                <Image
                    className={[style.container__image, style.container__image_background].join(' ')}
                    src={movie.posterUrl}
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
                    <div className={style.container__synopsis}>{t(`mainPage:promoMoviePosters.${synopsis}`)}</div>
                </div>
                <ColoredButton size='large' color='red' className={style.container__button}>
                    {t('watchButton')}
                </ColoredButton>
            </Link>
        </div>
    );
};

export default PromoPoster;

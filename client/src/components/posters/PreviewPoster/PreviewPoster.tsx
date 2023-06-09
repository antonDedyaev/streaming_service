import AgeBadge from '../../UI/badges/AgeBadge/AgeBadge';
import PreviewPosterContent from '../PreviewPosterContent/PreviewPosterContent';
import IMovies from '@/models/IMovies';
import Image from 'next/image';
import Link from 'next/link';
import style from './PreviewPoster.module.scss';
import { useRouter } from 'next/router';

interface PreviewPosterProps {
    movie: IMovies;
    className: string;
}

const PreviewPoster = ({ movie, className }: PreviewPosterProps) => {
    const { locale } = useRouter();
    return (
        <Link className={[style.container, className].join(' ')} href={`/movies/${movie.id}`}>
            <div className={[style.container__block, style.container__block_image].join(' ')}>
                <div className={style.container__imageWrapper}>
                    <Image className={style.container__image} src={movie.posterPreviewURL} alt={movie.name} fill />
                </div>

                <PreviewPosterContent movie={movie} />

                <AgeBadge className={style.container__badge} value={`${movie.ageRating}`} />
            </div>

            <div className={[style.container__block, style.container__block_text].join(' ')}>
                <p className={style.container__title}>{locale === 'en' && movie.enName ? movie.enName : movie.name}</p>
            </div>
        </Link>
    );
};

export default PreviewPoster;

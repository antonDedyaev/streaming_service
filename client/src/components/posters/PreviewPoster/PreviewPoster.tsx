import AgeBadge from '@/components/UI/badges/AgeBadge/AgeBadge';
import PriceBadge from '@/components/UI/badges/PriceBadge/PriceBadge';
import PreviewPosterContent from '../PreviewPosterContent/PreviewPosterContent';
import IMovie from '@/models/IMovie';
import Image from 'next/image';
import Link from 'next/link';
import style from './PreviewPoster.module.scss';

interface PreviewPosterProps {
<<<<<<< HEAD
    movie: IMovie
=======
    movie: IMovie;
    className: string;
>>>>>>> 37ed72bf44eb000f8e268d6f8445e03a95f71398
}

const PreviewPoster = ({ movie }: PreviewPosterProps) => {
    return (
<<<<<<< HEAD
        <div className={style.previewPoster}>
            <Link href="/">
                <div className={[style.block, style.block_image].join(' ')}>
                    <div className={style.imageWrapper}>
                        <Image
                            className={style.previewPoster__image} 
                            src="" 
                            alt="" />
                    </div>
                    <PreviewPosterContent movie={movie} />
                    <AgeBadge value="18" />
=======
        <Link className={[style.container, className].join(' ')} href="/">
            <div className={[style.container__block, style.container__block_image].join(' ')}>
                <div className={style.container__imageWrapper}>
                    <Image className={style.container__image} src="" alt="" fill />
>>>>>>> 37ed72bf44eb000f8e268d6f8445e03a95f71398
                </div>
                <PreviewPosterContent movie={movie} />
                <AgeBadge value="18" />
            </div>

            <div className={[style.container__block, style.container__block_text].join(' ')}>
                <p className={style.container__title}>Название фильма</p>
                <PriceBadge priceType="purchase" />
            </div>
        </Link>
    );
};

export default PreviewPoster;

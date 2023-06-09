import IMovies from '@/models/IMovies';
import Image from 'next/image';
import bookmark from '../../../../public/icons/posters/bookmark.png';
import wand from '../../../../public/icons/posters/wand.png';
import star from '../../../../public/icons/posters/star.png';
import circle from '../../../../public/icons/posters/circle.png';
import styles from './PreviewPosterContent.module.scss';
import PreviewPosterContentBrief from '../PreviewPosterContentBrief/PreviewPosterContentBrief';
import IMovie from '@/models/IMovie';

interface PreviewPosterContentProps {
    movie: IMovies | IMovie;
}

const PreviewPosterContent = ({ movie }: PreviewPosterContentProps) => {
    return (
        <div className={styles.container} data-testid={'previewPosterContent'}>
            <div className={styles.container__icons}>
                <Image
                    className={[styles.container__icon, styles.container__icon_favorite].join(' ')}
                    src={bookmark}
                    title='Смотреть позже'
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_similar].join(' ')}
                    src={wand}
                    title='Похожее'
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_rate].join(' ')}
                    src={star}
                    title='Уже смотрел, оценить'
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_dislike].join(' ')}
                    src={circle}
                    title='Не нравится такое'
                    alt="icon"
                />
            </div>

            <PreviewPosterContentBrief movie={movie as IMovie} className={styles.container__info} />
        </div>
    );
};

export default PreviewPosterContent;

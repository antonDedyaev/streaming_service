import IMovie from '@/models/IMovie';
import Image from 'next/image';
import bookmark from '../../../../public/icons/posters/bookmark.png';
import wand from '../../../../public/icons/posters/wand.png';
import star from '../../../../public/icons/posters/star.png';
import circle from '../../../../public/icons/posters/circle.png';
import styles from './PreviewPosterContent.module.scss';

interface PreviewPosterContentProps {
    movie: IMovie;
}

const PreviewPosterContent = ({ movie }: PreviewPosterContentProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__icons}>
                <Image
                    className={[styles.container__icon, styles.container__icon_favorite].join(' ')}
                    src={bookmark}
                    alt="icon"
                />
                <Image
                    className={[styles.container__icon, styles.container__icon_similar].join(' ')}
                    src={wand}
                    alt="icon"
                />    
                <Image
                    className={[styles.container__icon, styles.container__icon_rate].join(' ')}
                    src={star}
                    alt="icon"
                />    
                <Image
                    className={[styles.container__icon, styles.container__icon_dislike].join(' ')}
                    src={circle}
                    alt="icon"
                />
            </div>
            <div className={styles.container__info}>
                <div className={styles.container__rating}>
                    <span className={[styles.container__rating, styles.container__rating_integer].join(' ')}>9</span>
                    <span className={[styles.container__rating, styles.container__rating_fraction].join(' ')}>,1</span>
                </div>
                <div className={styles.container__text}>
                    <p>год, страна, жанр</p>
                    <p>продолжительность</p>
                </div>
            </div>
        </div>
    );
};

export default PreviewPosterContent;

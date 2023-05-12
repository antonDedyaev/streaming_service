import IMovie from '@/models/IMovie';
import styles from './PreviewPosterContentBrief.module.scss';

interface PreviewPosterContentBriefProps {
    movie: IMovie;
    className?: string;
}

const PreviewPosterContentBrief = ({ movie, className }: PreviewPosterContentBriefProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__rating}>
                <span className={[styles.container__rating, styles.container__rating_integer].join(' ')}>9</span>
                <span className={[styles.container__rating, styles.container__rating_fraction].join(' ')}>,1</span>
            </div>
            <div className={[styles.container__text, className].join(' ')}>
                <p>год, страна, жанр</p>
                <p>продолжительность</p>
            </div>
        </div>
    );
};

export default PreviewPosterContentBrief;

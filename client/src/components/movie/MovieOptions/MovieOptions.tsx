import styles from './MovieOptions.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';
import TextBadge from '@/components/UI/badges/TextBadge/TextBadge';

interface MovieOptionsProps {
    movie: IMovie;
}

const MovieOptions = ({ movie }: MovieOptionsProps) => {
    return (
        <div className={styles.options}>
            <div className={styles.options__block}>
                <div className={styles.options__blockTitle}>Языки</div>
                <div className={styles.options__blockValue}>Русский, Английский</div>
            </div>
            <div className={styles.options__block}>
                <div className={styles.options__blockTitle}>Субтитры</div>
                <div className={styles.options__blockValue}>Русский</div>
            </div>
            <div className={styles.options__block}>
                <div className={[styles.options__blockTitle, styles.options__blockTitle_full].join(' ')}>
                    Изображение и звук.
                    <span>Фактическое качество зависит от устройства и ограничений правообладателя.</span>
                </div>
                <div className={[styles.options__blockTitle, styles.options__blockTitle_mobile].join(' ')}>
                    Качество
                </div>
                <div className={styles.options__badge}>
                    {movie.displays.map((display) => (
                        <div className={styles.options__badgeItem}>
                            <TextBadge key={display} text={display} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieOptions;

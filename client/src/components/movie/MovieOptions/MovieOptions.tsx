import styles from './MovieOptions.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import TextBadge from '../../UI/badges/TextBadge/TextBadge';

interface MovieOptionsProps {
    movie: IMovie;
}

const MovieOptions = ({ movie }: MovieOptionsProps) => {
    return (
        <div className={styles.container} role={'div-options'}>
            <div className={styles.container__block}>
                <div className={styles.container__title}>Языки</div>
                <div className={styles.container__value}>{movie.language.join(', ')}</div>
            </div>
            <div className={styles.container__block}>
                <div className={styles.container__title}>Субтитры</div>
                <div className={styles.container__value}>{movie.subtitlesFull.join(', ')}</div>
            </div>
            <div className={styles.container__block}>
                <div className={[styles.container__title, styles.container__title_full].join(' ')}>
                    Изображение и звук.
                    <span className={styles.container__quality}>Фактическое качество зависит от устройства и ограничений правообладателя.</span>
                </div>
                <div className={[styles.container__title, styles.container__title_mobile].join(' ')}>
                    Качество
                </div>
                <div className={styles.container__badgesContainer}>
                    {movie.displays.map((display) => (
                        <div key={display} className={styles.container__badge}>
                            <TextBadge text={display} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieOptions;

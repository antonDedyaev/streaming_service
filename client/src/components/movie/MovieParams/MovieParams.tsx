import styles from './MovieParams.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import TextLinkUI from '../../UI/links/TextLink/TextLinkUI';
import TextBadge from '../../UI/badges/TextBadge/TextBadge';
import Image from 'next/image';
import soundIcon from '../../../../public/icons/sound.png';
import subtitlesIcon from '../../../../public/icons/subtitles.png';

interface MovieParamsProps {
    movie: IMovie;
}

const MovieParams = ({ movie }: MovieParamsProps) => {
    return (
        <div className={styles.container} data-testid="div-params">
            <div className={styles.container__list}>
                <TextLinkUI href="/" option="bright">
                    {movie.year}
                </TextLinkUI>
                <span className={styles.container__listItem}>{movie.time}</span>
                <span className={styles.container__listItem}>{movie.ageLimit}</span>
            </div>
            <div className={styles.container__list}>
                <TextLinkUI
                    href="/"
                    option="bright"
                    className={[styles.container__listItem, styles.container__listItem_point].join(' ')}
                >
                    {movie.production}
                </TextLinkUI>
                {movie.genres.slice(0, 3).map((genre) => (
                    <TextLinkUI
                        key={genre}
                        href="/"
                        option="bright"
                        className={[styles.container__listItem, styles.container__listItem_point].join(' ')}
                    >
                        {genre}
                    </TextLinkUI>
                ))}
            </div>
            <div className={styles.container__list}>
                <TextBadge text={movie.displays[0]} />
                <Image
                    src={soundIcon}
                    alt="soundIcon"
                    className={[styles.container__listIcon, styles.container__listIcon_sound].join(' ')}
                />
                <div className={styles.container__listItem}>
                    {movie.voiceActing.map((voice) => (
                        <div
                            key={voice}
                            className={[styles.container__listItem, styles.container__listItem_point].join(' ')}
                        >
                            {voice}
                        </div>
                    ))}
                </div>
                {movie.subtitles.length > 0 && (
                    <>
                        <Image src={subtitlesIcon} alt="subtitlesIcon" className={styles.container__listIcon} />
                        <div className={styles.container__listItem}>
                            {movie.subtitles.map((sub) => (
                                <div
                                    key={sub}
                                    className={[styles.container__listItem, styles.container__listItem_point].join(' ')}
                                >
                                    {sub}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieParams;

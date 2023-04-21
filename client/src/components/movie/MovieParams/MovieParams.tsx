import styles from './MovieParams.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';
import TextLinkUI from '@/components/UI/TextLink/TextLinkUI';
import TextBadge from '@/components/UI/badges/TextBadge/TextBadge';
import Image from 'next/image';
import soundIcon from '@/../public/icons/sound.png';
import subtitlesIcon from '@/../public/icons/subtitles.png';

interface MovieParamsProps {
    movie: IMovie;
}

const MovieParams = ({ movie }: MovieParamsProps) => {
    return (
        <div className={styles.params}>
            <div className={styles.params__list}>
                <TextLinkUI href="/" option="bright">
                    {movie.year}
                </TextLinkUI>
                <span className={styles.params__listItem}>{movie.time}</span>
                <span className={styles.params__listItem}>{movie.ageLimit}</span>
            </div>
            <div className={styles.params__list}>
                <TextLinkUI href="/" option="bright" className={styles.params__listItem_point}>
                    {movie.production}
                </TextLinkUI>
                {movie.genres.slice(0, 3).map((genre) => (
                    <TextLinkUI key={genre} href="/" option="bright" className={styles.params__listItem_point}>
                        {genre}
                    </TextLinkUI>
                ))}
            </div>
            <div className={styles.params__list}>
                <TextBadge text={movie.displays[0]} />
                <Image src={soundIcon} alt="soundIcon" className={styles.params__listIcon} />
                <div className={styles.params__listItem}>
                    {movie.voiceActing.map((voice) => (
                        <div key={voice} className={styles.params__listItem_point}>
                            {voice}
                        </div>
                    ))}
                </div>
                {movie.subtitles.length > 0 && (
                    <>
                        <Image src={subtitlesIcon} alt="subtitlesIcon" className={styles.params__listIcon} />
                        <div className={styles.params__listItem}>
                            {movie.subtitles.map((sub) => (
                                <div key={sub} className={styles.params__listItem_point}>
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

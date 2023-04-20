import styles from './MovieInfo.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';
import TextLinkUI from '@/components/UI/TextLink/TextLinkUI';
import AgeBadge from '@/components/UI/badges/AgeBadge';
import PriceBadge from '@/components/UI/badges/PriceBadge';
import TextBadge from '@/components/UI/badges/TextBadge';
import Image from 'next/image';
import soundIcon from '@/../public/icons/sound.png';
import subtitlesIcon from '@/../public/icons/subtitles.png';
import SquareCardsList from '@/components/squareCard/SquareCardsList/SquareCardsList';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';

interface MovieInfoProps {
    movie: IMovie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
    return (
        <div className={styles.info}>
            <div className={styles.info__title}>{movie.title}</div>
            <div className={styles.info__params}>
                <div className={styles.info__paramsList}>
                    <TextLinkUI href="/" option="bright">
                        {movie.year}
                    </TextLinkUI>
                    <span className={styles.info__paramsListItem}>{movie.time}</span>
                    <span className={styles.info__paramsListItem}>{movie.ageLimit}</span>
                </div>
                <div className={styles.info__paramsList}>
                    <TextLinkUI href="/" option="bright" className={styles.info__paramsListItem_point}>
                        {movie.production}
                    </TextLinkUI>
                    {movie.genres.slice(0, 3).map((genre) => (
                        <TextLinkUI key={genre} href="/" option="bright" className={styles.info__paramsListItem_point}>
                            {genre}
                        </TextLinkUI>
                    ))}
                </div>
                <div className={styles.info__paramsList}>
                    <TextBadge text={movie.displays[0]} />
                    <Image src={soundIcon} alt="soundIcon" className={styles.info__paramsListIcon} />
                    <div className={styles.info__paramsListItem}>
                        {movie.voiceActing.map((voice) => (
                            <div key={voice} className={styles.info__paramsListItem_point}>
                                {voice}
                            </div>
                        ))}
                    </div>
                    {movie.subtitles.length > 0 && (
                        <>
                            <Image src={subtitlesIcon} alt="subtitlesIcon" className={styles.info__paramsListIcon} />
                            <div className={styles.info__paramsListItem}>
                                {movie.subtitles.map((sub) => (
                                    <div key={sub} className={styles.info__paramsListItem_point}>
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <SquareCardsList movie={movie} className={styles.info__cards} />
            <SpoilerUI
                className={styles.info__spoiler}
                toggleButtonTexts={['Детали о фильме', 'Свернуть детали']}
                shownLines={6}
                truncateFormat="vertical"
                buttonTextColor="faded"
            >
                <p key={movie.description[0]}>{movie.description[0]}</p>
                {movie.description.slice(1).map((descrip) => (
                    <p key={descrip}>{descrip}</p>
                ))}

                <div className={styles.info__spoiler}>
                    <div className={styles.info__options}>
                        <div className={styles.info__optionsBlock}>
                            <div className={styles.info__optionsBlockTitle}>Языки</div>
                            <div className={styles.info__optionsBlockValue}>Русский, Английский</div>
                        </div>
                        <div className={styles.info__optionsBlock}>
                            <div className={styles.info__optionsBlockTitle}>Субтитры</div>
                            <div className={styles.info__optionsBlockValue}>Русский</div>
                        </div>
                        <div className={styles.info__optionsBlock}>
                            <div className={styles.info__optionsBlockTitle}>
                                Изображение и звук.
                                <span>Фактическое качество зависит от устройства и ограничений правообладателя.</span>
                                <div className={styles.info__optionsBadge}>
                                    {movie.displays.map((display) => (
                                        <div className={styles.info__optionsBadgeItem}>
                                            <TextBadge key={display} text={display} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SpoilerUI>
            <div className={styles.info__ratingBox}>
                <div className={styles.info__rating}>
                    <div
                        className={[
                            styles.info__ratingValue,
                            movie.raiting > 7.5 && styles[`info__ratingValue_good`],
                        ].join(' ')}
                    >
                        {movie.raiting}
                    </div>
                    <div className={styles.info__ratingText}>
                        <span>Рейтинг</span>
                        <span>Интересный сюжет</span>
                        <span>118 163 оценки</span>
                    </div>
                    <div className={styles.info__ratingEstimate}>Оценить</div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;

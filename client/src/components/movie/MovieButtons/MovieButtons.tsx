import styles from './MovieButtons.module.scss';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import Image from 'next/image';
import playIcon from '../../../../public/icons/movie/play.svg';
import bookmarkIcon from '../../../../public/icons/movie/bookmark.png';
import shareIcon from '../../../../public/icons//movie/share.png';

const MovieButtons = () => {
    return (
        <div className={styles.container} role={'div-buttons'}>
            <ButtonUI className={styles.container__item} background="transparentWhite" shape="medium">
                <Image src={playIcon} alt="playIcon" /> <span>Трейлер</span>
            </ButtonUI>
            <ButtonUI className={styles.container__item} background="transparentWhite" shape="medium">
                <Image src={bookmarkIcon} alt="bookmarkIcon" />
            </ButtonUI>
            <ButtonUI className={styles.container__item} background="transparentWhite" shape="medium">
                <Image src={shareIcon} alt="shareIcon" />
            </ButtonUI>
        </div>
    );
};

export default MovieButtons;

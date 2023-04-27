import styles from './MovieDevicesImage.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import tvImg from '../../../../public/img/devices/tv.png';
import ipadImg from '../../../../public/img/devices/ipad.png';
import Image from 'next/image';

interface MovieDevicesImageProps {
    movie: IMovie;
}

const MovieDevicesImage = ({ movie }: MovieDevicesImageProps) => {
    return (
        <div className={styles.container} data-testid="div-movieDevicesImage">
            <Image className={styles.container__tv} src={tvImg} alt="Устройства для просмотра Иви" />
            <Image className={styles.container__ipad} src={ipadImg} alt="Устройства для просмотра Иви" />
            <Image
                className={styles.container__posterTv}
                src={movie.poster}
                alt={`Постер ${movie.title}`}
                width="337"
                height="192"
            />
            <Image
                className={styles.container__posterIpad}
                src={movie.poster}
                alt={`Постер ${movie.title}`}
                width="188"
                height="102"
            />
        </div>
    );
};

export default MovieDevicesImage;

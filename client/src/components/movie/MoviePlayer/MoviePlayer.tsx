import styles from './MoviePlayer.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import dynamic from 'next/dynamic';
import MovieButtons from '../MovieButtons/MovieButtons';

interface MoviePlayerProps {
    movie: IMovie;
}

const MoviePlayer = ({ movie }: MoviePlayerProps) => {
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    return (
        <div className={styles.container}>
            <ReactPlayer
                className={styles.container__player}
                width="100%"
                height="100%"
                url="https://special-central.dfs.ivi.ru/newseason/ivi-logo.mp4"
                controls={true}
            />

            <div className={styles.container__buttons}>
                <MovieButtons />
            </div>
        </div>
    );
};

export default MoviePlayer;

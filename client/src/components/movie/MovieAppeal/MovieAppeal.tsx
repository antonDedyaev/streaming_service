import styles from './MovieAppeal.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import LinkUI from '@/components/UI/links/Link/LinkUI';

interface MovieAppealProps {
    movie: IMovie;
}

const MovieAppeal = ({ movie }: MovieAppealProps) => {
    return (
        <div className={styles.container} data-testid="div-movieAppeal">
            <h2>Cмотреть «{movie.title}» на всех устройствах</h2>
            <p>Приложение доступно для скачивания на iOS, Android, SmartTV и приставках</p>
            <LinkUI className={styles.container__link} href="https://www.ivi.ru/devices" shape="rectangular">
                Подключить устройства
            </LinkUI>
        </div>
    );
};

export default MovieAppeal;

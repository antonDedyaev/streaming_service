import styles from './MovieAppeal.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import ShapedLinkUI from '@/components/UI/links/ShapedLink/ShapedLinkUI';

interface MovieAppealProps {
    movie: IMovie;
}

const MovieAppeal = ({ movie }: MovieAppealProps) => {
    return (
        <div className={styles.container} data-testid="div-movieAppeal">
            <h2>Cмотреть «{movie.title}» на всех устройствах</h2>
            <p>Приложение доступно для скачивания на iOS, Android, SmartTV и приставках</p>
            <ShapedLinkUI className={styles.container__link} href="https://www.ivi.ru/devices" shape="rectangular">
                Подключить устройства
            </ShapedLinkUI>
        </div>
    );
};

export default MovieAppeal;

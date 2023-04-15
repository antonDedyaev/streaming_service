import PreviewPoster from '../PreviewPoster/PreviewPoster';
import style from './PostersList.module.scss';

interface PostersListProps {
    posters: React.FC[]
}

function PostersList({posters}: PostersListProps) {
    return (
        <ul className={style.postersList}>
            {/* {posters.map(poster => {
                <li><PreviewPoster /></li>
            })} */}
        </ul>
    )
}
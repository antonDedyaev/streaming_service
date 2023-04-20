import PreviewPoster from '../PreviewPoster/PreviewPoster';
import style from './PostersList.module.scss';

interface PostersListProps {
    posters: number[]
    className: string
}

const PostersList = ({ posters, className }: PostersListProps) => {
    return (
        <>
            {posters.map(poster => (
                <PreviewPoster 
                    key={poster}
                    className={className}
                />
            ))}
        </>
    )
}

export default PostersList
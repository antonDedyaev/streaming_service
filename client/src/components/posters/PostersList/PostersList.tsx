import PreviewPoster from '../PreviewPoster/PreviewPoster';
import style from './PostersList.module.scss';

interface PostersListProps {
    posters: number[]
    className: string
}

function PostersList({ posters, className }: PostersListProps) {
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
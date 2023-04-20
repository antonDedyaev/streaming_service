import RatingPoster from '../../RatingPoster/RatingPoster';

export interface IRatingFilm {
    name: string,
    image: string,
    logo: string,
    place: number
}

interface RatingPostersListProps {
    films: IRatingFilm[]
    className: string
}

function RatingPostersList({ films, className }: RatingPostersListProps) {
    return (
        <>
            <ul>
                {films.map(film => (
                    <li key={film.name}>
                        <RatingPoster 
                            className={className}
                            film={film}
                        />
                    </li>
                ))}
            </ul>
            
            <style jsx>
                {`
                    ul {
                        display: flex;
                    }
                `}
            </style>
        </>
    )
}

export default RatingPostersList
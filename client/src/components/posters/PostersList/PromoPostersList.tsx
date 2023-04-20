import PromoPoster from '../PromoPoster/PromoPoster';
import IPromoFilm from '@/models/IPromoFilm';

interface PromoPostersListProps {
    films: IPromoFilm[]
    className: string
}

const PromoPostersList = ({ films, className }: PromoPostersListProps) => {
    return (
        <>
            <ul>
                {films.map(film => (
                    <li key={film.name}>
                        <PromoPoster 
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

export default PromoPostersList
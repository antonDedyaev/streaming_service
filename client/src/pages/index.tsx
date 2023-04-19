import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import SquareCardsList from '@/components/squareCard/SquareCardsList/SquareCardsList';
import { movies as movie } from '../components/squareCard/SquareCardsList/Temp/Movie.data';
import Navbar from '@/components/menu/Navbar/Navbar';
import { films } from '@/components/posters/RatingPoster/films.data';

function HomePage() {
    const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return (
        <>
            <Navbar page="home" />

            <Slider actors={actors} />

            <Slider movies={movies} />

            <Slider posters={films} />

            <SquareCardsList movie={movie[0]} />
        </>
    );
}

export default HomePage;

import MoviesSlider from '@/components/sliders/MoviesSlider/MoviesSlider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import { movies as movie } from '../components/squareCard/SquareCardsList/Temp/Movie.data';
import Navbar from '@/components/menu/Navbar/Navbar';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';

function HomePage() {
    const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return (
        <>
            <Navbar page="home" />

            <MoviesSlider actors={actors} />

            <MoviesSlider movies={movies} />

            <div style={{ display: 'flex' }} className="container">
                <div style={{ width: '62.5%' }}></div>
                <MovieInfo movie={movie[0]} />
            </div>
        </>
    );
}

export default HomePage;

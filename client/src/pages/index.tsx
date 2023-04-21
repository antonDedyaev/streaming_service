import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import { movies as movie } from '../components/squareCard/SquareCardsList/Temp/Movie.data';
import Navbar from '@/components/menu/Navbar/Navbar';
import { movies } from '@/components/posters/PromoPoster/promoMovies.data';
import PostersList from '@/components/posters/PostersList/PostersList';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';

function HomePage() {
    return (
        <>
            <Navbar page="home" />

            <Slider actors={actors} />

            <Slider movies={movies} />

            <Slider posters={movies} />

            <div
                style={
                    {
                        /*display: 'flex'*/
                    }
                }
                className="container"
            >
                <div style={{ width: '62.5%' }}></div>
                <MovieInfo movie={movie[0]} />
            </div>
        </>
    );
}

export default HomePage;

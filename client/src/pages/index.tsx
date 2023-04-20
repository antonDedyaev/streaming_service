import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import Navbar from '@/components/menu/Navbar/Navbar';
import PostersList from '@/components/posters/PostersList/PostersList';
import { movies } from '@/components/posters/RatingPoster/ratingMovies.data';
import ActorList from '@/components/actor/ActorList/ActorList';

function HomePage() {
    // const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return (
        <>
            <Navbar page="home" />

            <Slider itemType='actor' length={actors.length}>
                <ActorList actors={actors} />
            </Slider>

            <Slider itemType='promo' length={movies.length}>
                <PostersList posterType='promo' movies={movies} />
            </Slider>

            <Slider itemType='preview' length={movies.length}>
                <PostersList posterType='preview' movies={movies} />
            </Slider>

            <Slider itemType='rating' length={movies.length}>
                <PostersList posterType='rating' movies={movies} />
            </Slider>

        </>
    );
}

export default HomePage;

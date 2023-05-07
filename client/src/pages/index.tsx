import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import PostersList from '@/components/posters/PostersList/PostersList';
import { promoMovies } from '@/components/posters/PromoPoster/promoMovies.data';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import TopTenSection from '@/components/sections/TopTenSection/TopTenSection';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import SearchModal from '@/components/modals/SearchModal/SearchModal';
import SignInModal from '@/components/modals/LoginModal/LoginModal';
import ActorItem from '@/components/actor/ActorItem/ActorItem';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';

function HomePage() {
    return (
        <>
            <MainContainer
                keywords={['homePage', 'iviEtoKryto']}
                title="Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
                page="home"
            >
                <ActorItem className="" actor={actors[0]} size="large" />

                <ActorItem className="" actor={actors[0]} size="medium" />

                <ActorItem className="" actor={actors[0]} size="small" />

                <Slider itemType="promo" length={promoMovies.length}>
                    <PostersList posterType="promo" movies={promoMovies} />
                </Slider>

                <Slider itemType="actor" length={actors.length}>
                    <ActorList actors={actors} size="large" />
                </Slider>

                <MovieInfo movie={movies[0]}/>
                
                
                {/* <FilmographySection movies={ratingMovies} /> */}

                <MoviesSection title='Лучшие фильмы' movies={ratingMovies} href='/' />

                <MoviesSection title='С сериалом «Лесник» смотрят' movies={ratingMovies} href='' />

                <TopTenSection movies={ratingMovies} />

                    <div className={styles.container__section}>
                        <MoviesSection title="Зарубежные фильмы" movies={ratingMovies} href="/" />
                    </div>

                <PersonsSection size='small' persons={actors} />
            </MainContainer>
        </>
    );
}

export default HomePage;

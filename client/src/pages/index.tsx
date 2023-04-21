import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import { movies as movie } from '../components/squareCard/SquareCardsList/Temp/Movie.data';
import Navbar from '@/components/menu/Navbar/Navbar';
import PostersList from '@/components/posters/PostersList/PostersList';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';

import { movies } from '@/components/posters/RatingPoster/ratingMovies.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import ModalUI from '@/components/UI/Modal/ModalUI';
import { useState } from 'react';
import MainContainer from '@/components/MainContainer/MainContainer';
import MoviePlayer from '@/components/movie/MoviePlayer/MoviePlayer';

function HomePage() {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    return (
        <>
            <MainContainer
                keywords={['homePage', 'iviEtoKryto']}
                title="Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
                page="home"
            >
                <div style={{ display: 'flex' }} className="container">
                    <MoviePlayer movie={movie[0]} />
                    <MovieInfo movie={movie[0]} />
                </div>

                <Slider itemType="preview" length={movies.length}>
                    <PostersList posterType="preview" movies={movies} />
                </Slider>

                <Slider itemType="rating" length={movies.length}>
                    <PostersList posterType="rating" movies={movies} />
                </Slider>

                <Slider itemType="rating" length={actors.length}>
                    <ActorList actors={actors} amt={true} effect={true} size="large" />
                </Slider>

                <button onClick={() => setIsShowModal(true)}>Показать модалку</button>

                {isShowModal && <ModalUI onClick={() => setIsShowModal(false)}>Hello</ModalUI>}
            </MainContainer>
        </>
    );
}

export default HomePage;

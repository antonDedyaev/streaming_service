import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import { movies as movie } from '../components/squareCard/SquareCardsList/Temp/Movie.data';
import PostersList from '@/components/posters/PostersList/PostersList';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import { promoMovies } from '@/components/posters/PromoPoster/promoMovies.data';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import ModalUI from '@/components/UI/Modal/ModalUI';
import { useState } from 'react';
import MainContainer from '@/components/main/MainContainer/MainContainer';
import MoviePlayer from '@/components/movie/MoviePlayer/MoviePlayer';
import TabBar from '@/components/TabBar/TabBar';
import FilmographyItem from '@/components/actor/ActorFilmography/FilmographyItem';
import ActorItem from '@/components/actor/ActorItem/ActorItem';
import PreviewPoster from '@/components/posters/PreviewPoster/PreviewPoster';

function HomePage() {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    return (
        <>
            <MainContainer
                keywords={['homePage', 'iviEtoKryto']}
                title="Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
                page="home"
            >
                <PreviewPoster
                    movie={ratingMovies[0]}
                    className=''
                />

                <Slider itemType="actor" length={actors.length}>
                    <ActorList actors={actors} size="large" />
                </Slider>

                <Slider itemType="actor" length={actors.length}>
                    <PostersList movies={ratingMovies} posterType='preview' />
                </Slider>

                <Slider itemType="promo" length={ratingMovies.length}>
                    <PostersList movies={ratingMovies} posterType='promo' />
                </Slider>

                <Slider itemType="rating" length={ratingMovies.length}>
                    <PostersList movies={ratingMovies} posterType='rating' />
                </Slider>
            </MainContainer>
        </>
    );
}

export default HomePage;

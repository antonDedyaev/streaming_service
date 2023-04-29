import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import PostersList from '@/components/posters/PostersList/PostersList';
import { promoMovies } from '@/components/posters/PromoPoster/promoMovies.data';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import ModalUI from '@/components/UI/Modal/ModalUI';
import { useEffect, useState } from 'react';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import TabBar from '../components/main_container/TabBar/TabBar';
import PreviewPoster from '@/components/posters/PreviewPoster/PreviewPoster';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';
import ActorItem from '@/components/actor/ActorItem/ActorItem';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import SearchModal from '@/components/modals/SearchModal/SearchModal';
import SignInModal from '@/components/modals/LoginModal/LoginModal';

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

                <MovieInfo movie={movies[0]} />
            </MainContainer>
        </>
    );
}

export default HomePage;

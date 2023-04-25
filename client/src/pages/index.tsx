import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import PostersList from '@/components/posters/PostersList/PostersList';
import { promoMovies } from '@/components/posters/PromoPoster/promoMovies.data';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import ModalUI from '@/components/UI/Modal/ModalUI';
import { useState } from 'react';
import MainContainer from '@/components/wrappers/MainContainer/MainContainer';
import TabBar from '../components/wrappers/TabBar/TabBar';
import PreviewPoster from '@/components/posters/PreviewPoster/PreviewPoster';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';

function HomePage() {
    return (
        <>
            <MainContainer
                keywords={['homePage', 'iviEtoKryto']}
                title="Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
                page="home"
            >
                <Slider itemType="promo" length={promoMovies.length}>
                    <PostersList posterType="promo" movies={promoMovies} />
                </Slider>

                <Slider itemType="actor" length={actors.length}>
                    <ActorList actors={actors} size="large" />
                </Slider>
            </MainContainer>
        </>
    );
}

export default HomePage;

import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import PostersList from '@/components/posters/PostersList/PostersList';
import { promoMovies } from '@/components/posters/PromoPoster/promoMovies.data';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import ModalUI from '@/components/UI/Modal/ModalUI';
import { useState } from 'react';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import TabBar from '../components/main_container/TabBar/TabBar';
import PreviewPoster from '@/components/posters/PreviewPoster/PreviewPoster';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';
import ActorItem from '@/components/actor/ActorItem/ActorItem';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import SortMovies from '@/components/movie/SortMovies/SortMovies';
import FilterPanel from '@/components/filters/FilterPanel';
import FilterPlank from '@/components/filters/FilterPlank';
import customStyles from '../components/filters/FilterPlank.module.scss';
import badge from '../../public/icons/badge.svg';
import userRank from '../../public/icons/userRank.svg';
import FilterRange from '@/components/filters/FilterRange';
import FilterList from '@/components/filters/FilterList';
import { genres, countries } from '../components/filters/temp/genres';
import FilterSearch from '@/components/filters/FilterSearch';

function HomePage() {
    return (
        <>
            <MainContainer
                keywords={['homePage', 'iviEtoKryto']}
                title="Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
                page="home"
            >
                <ActorItem className="" actor={actors[0]} size="small" />

                <Slider itemType="promo" length={promoMovies.length}>
                    <PostersList posterType="promo" movies={promoMovies} />
                </Slider>

                <MovieInfo movie={movies[0]} />

                <SortMovies />

                <FilterPanel>
                    <FilterPlank title="Жанры" className={customStyles.container__dropdown_genres}>
                        <FilterList items={genres} />
                    </FilterPlank>
                    <FilterPlank title="Страны" className={customStyles.container__dropdown_countries}>
                        <FilterList items={countries} />
                    </FilterPlank>
                    <FilterPlank title="Рейтинг" className={customStyles.container__dropdown_narrow}>
                        <FilterRange image={badge} limit={10} step={0.1} />
                    </FilterPlank>
                    <FilterPlank title="Оценки" className={customStyles.container__dropdown_narrow}>
                        <FilterRange image={userRank} limit={1000000} step={1000} />
                    </FilterPlank>
                    <FilterPlank title="Режиссер" className={customStyles.container__dropdown_narrow}>
                        <FilterSearch searchBy="Режиссер" />
                    </FilterPlank>
                    <FilterPlank title="Актер" className={customStyles.container__dropdown_narrow}>
                        <FilterSearch searchBy="Актер" />
                    </FilterPlank>
                </FilterPanel>

                <SpoilerUI toggleButtonTexts={['show', 'hide']} shownLines={0}>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque eius qui repellendus?
                        Voluptates sunt perferendis laborum quia accusantium sint totam molestiae, eligendi, ut commodi
                        nostrum earum deleniti modi, ratione porro.
                    </div>
                </SpoilerUI>
            </MainContainer>
        </>
    );
}

export default HomePage;

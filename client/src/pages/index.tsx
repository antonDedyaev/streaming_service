import Slider from '@/components/Slider/Slider';
import styles from '@/styles/pages/HomePage.module.scss';
import PostersList from '@/components/posters/PostersList/PostersList';
import { promoMovies } from '@/components/posters/PromoPoster/promoMovies.data';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import TopTenSection from '@/components/sections/TopTenSection/TopTenSection';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import { singleParagraph } from '../components/UI/Spoiler/storiesTemplates';
import ShapedLinkUI from '@/components/UI/links/ShapedLink/ShapedLinkUI';
import Image from 'next/image';
import Link from 'next/link';

function HomePage() {
    return (
        <MainContainer
            keywords={['homePage', 'iviEtoKryto']}
            title="Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
            page="home"
        >
            <div className={styles.container}>
                <div className="container">
                    <div className={[styles.container__section, styles.container__section_promo].join(' ')}>
                        <Slider itemType="promo" length={promoMovies.length}>
                            <PostersList posterType="promo" movies={promoMovies} />
                        </Slider>
                    </div>

                    <ShapedLinkUI
                        href="https://www.ivi.ru/subscribe?redirect_url=%2F"
                        className={styles.container__link}
                        shape="rectangular"
                    >
                        <Image
                            src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg"
                            alt=""
                            width={24}
                            height={32}
                        />
                        30 дней подписки бесплатно
                    </ShapedLinkUI>

                    <div className={[styles.container__section, styles.container__section_top].join(' ')}>
                        <TopTenSection movies={ratingMovies} />
                    </div>

                    <div className={styles.container__spoiler}>
                        <h2 className={styles.container__title}>
                            Онлайн-кинотеатр Иви: фильмы в хорошем качестве всегда приносят настоящее удовольствие
                        </h2>
                        <SpoilerUI shownLines={1} toggleButtonTexts={['Показать', 'Скрыть']}>
                            {singleParagraph}
                        </SpoilerUI>
                    </div>

                    <div className={styles.container__section}>
                        <MoviesSection title="Зарубежные фильмы" movies={ratingMovies} href="/" />
                    </div>

                    <div className={styles.container__section}>
                        <MoviesSection title="Драмы" movies={ratingMovies} href="/" />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}

export default HomePage;

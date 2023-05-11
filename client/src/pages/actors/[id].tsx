import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import styles from '@/styles/pages/CardActorPage.module.scss';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import ImgSquareUI from '@/components/UI/squares/ImgSquareUI/ImgSquareUI';
import FilmographySection from '@/components/sections/FilmographySection/FilmographySection';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';

function CardActorPage() {
    return (
        <MainContainer
            keywords={['person']}
            title={`${actors[0].firstName} ${actors[0].lastName} (Name in en): фильмография, фото, биография. ${actors[0].role}`}
            page="other"
        >
            <div className="container">
                <div style={{ color: 'white', position: 'absolute' }}>Назад</div>

                <div className={styles.container}>
                    <section className={[styles.container__info, styles.info].join(' ')}>
                        <div className={styles.info__img}>
                            <ImgSquareUI actor={actors[0]} border="medium" />
                        </div>
                        <h1 className={styles.info__title}>
                            {actors[0].firstName} {actors[0].lastName}
                        </h1>
                        <span className={styles.info__alternate}>Name in en</span>
                    </section>
                    <section className={styles.container__filmography}>
                        <FilmographySection movies={ratingMovies} />
                    </section>
                    <section style={{ color: 'white' }}>Хлебные крошки</section>
                </div>
            </div>
        </MainContainer>
    );
}

export default CardActorPage;

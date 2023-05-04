import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import FilterList from '@/components/filters/FilterList';
import FilterPanel from '@/components/filters/FilterPanel';
import FilterPlank from '@/components/filters/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange';
import { countries, genres } from '@/components/filters/temp/items';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import styles from '@/styles/pages/MoviesPage.module.scss';
import icon from '@/../public/icons/rating.svg';
import FilterSearch from '@/components/filters/FilterSearch';

function MoviesPage() {
    return (
        <MainContainer
            keywords={['homePage', 'iviEtoKryto']}
            title="Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн фильмов на ivi.ru"
            page="home"
        >
            <div className="container">
                <div className={styles.container}>
                    <div className={styles.container__spoiler}>
                        <h1 className={styles.container__crumbs}>Хлебные/крошки</h1>

                        <h2 className={styles.container__title}>Фильмы смотреть онлайн</h2>
                        <SpoilerUI shownLines={2} toggleButtonTexts={['Показать', 'Скрыть']}>
                            <p>
                                Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая сайты в поисках
                                чего-нибудь интересного? Стоит задержаться на ivi.ru – фильмов, которые собраны у нас,
                                вам хватит надолго. Коллекция постоянно пополняется как новыми фильмами, так и
                                признанными шедеврами прошлых лет! Независимо от того, кто вы – любитель энергичных
                                боевиков или поклонница молодежных сериалов, изобилие нашего каталога заставит вас
                                забыть обо всех других способах проведения досуга, и вы будете пересматривать любимые
                                фильмы онлайн снова и снова!
                            </p>
                            <p>
                                Выбор фильмов очень широк и многообразен, так что каждый найдет для себя что-то
                                интересное, каким бы ни были его вкусы. Предпочитаете картины исключительно зарубежного
                                производства? У нас их предостаточно: это и золотая классика Голливуда, и душевные
                                французские комедии, и темпераментные итальянские драмы, и шумные индийские музыкальные
                                фильмы. А может, вы патриот и любите российские фильмы? Что ж, и таких фильмов у нас
                                немало. Что вам больше по вкусу – добрая старая классика или новинки кинопроката?
                                Неважно, каким будет ваш ответ – у нас есть все, как картины эпохи зарождения
                                кинематографа, так 2018 года и фильмы 2017.
                            </p>
                            <p>
                                В нашем каталоге вы найдете любые жанры. Это и фильмы про любовь, и детективы, и
                                боевики, и вестерны, и фантастика, и арт-хаус, и уморительные комедии, и фильмы про
                                войну, и ужасы, и триллеры, и документалистика... Кроме «полного метра» на сайте
                                представлены также короткометражные фильмы, а также иностранные и русские сериалы.
                            </p>
                            <p>
                                Если вас интересуют самые знаковые фильмы онлайн в том или ином жанре, система
                                рубрикации поможет вам без труда сориентироваться и найти, например, лучшие драмы или
                                лучший анимационный фильм онлайн.
                            </p>
                            <p>
                                Не упустите замечательную возможность смотреть фильмы онлайн без регистрации, выбирая
                                только то, что вам действительно интересно, и тогда, когда вам это удобно. Ведь это так
                                просто и приятно!
                            </p>
                        </SpoilerUI>
                    </div>

                    <FilterPanel>
                        <FilterPlank title="Жанры" className={plankStyles.container__dropdown_leftPositioned}>
                            <FilterList items={genres} />
                        </FilterPlank>

                        <FilterPlank title="Страны" className={plankStyles.container__dropdown_centerPositioned}>
                            <FilterList items={countries} />
                        </FilterPlank>

                        <FilterPlank title="Рейтинг" className={styles.container__filterItem}>
                            <FilterRange image={icon} limit={10} step={0.1} />
                        </FilterPlank>

                        <FilterPlank title="Оценки" className={styles.container__filterItem}>
                            <FilterRange image={icon} limit={1000000} step={100} />
                        </FilterPlank>

                        <FilterPlank title="Режиссёр" className={styles.container__filterItem}>
                            <FilterSearch searchBy="Режиссёр" />
                        </FilterPlank>

                        <FilterPlank title="Актёр" className={styles.container__filterItem}>
                            <FilterSearch searchBy="Актёр" />
                        </FilterPlank>
                    </FilterPanel>

                    <div className={styles.container__section}>
                        <MoviesSection title="Премьеры фильмов" movies={ratingMovies} href="/" />
                    </div>

                    <div className={styles.container__section}>
                        <MoviesSection title="Лучшие фильмы" movies={ratingMovies} href="/" />
                    </div>

                    <div className={styles.container__section}>
                        <PersonsSection size="large" persons={actors} />
                    </div>

                    <div className={styles.container__section}>
                        <MoviesSection title="Фильмы в 4K UHD" movies={ratingMovies} href="/" />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}

export default MoviesPage;

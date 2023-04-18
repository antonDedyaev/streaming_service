import MoviesSlider from '@/components/sliders/MoviesSlider/MoviesSlider';
import ButtonUI from '@/components/UI/Button/ButtonUI';
import PreviewPoster from '@/components/posters/PreviewPoster/PreviewPoster';
import styles from '@/styles/pages/HomePage.module.scss';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import LinkUI from '@/components/UI/Links/LinkUI';
import FilmographyItem from '@/components/actor/ActorFilmography/FilmographyItem';
import vars from '../components/actor/ActorFilmography/FilmographyItem.module.scss';
import variables from '../components/UI/Links/LinkUI.module.scss';
import tvIcon from '../../public/icons/link_icons/devices_tv.svg';
import devicesIcon from '../../public/icons/link_icons/devices_all.svg';
import Image from 'next/image';

function HomePage() {
    return (
        <>
            <ButtonUI className="button" variant="large" background="lightRed">
                <div>Красная кнопка</div>
            </ButtonUI>
            <ButtonUI className="button" variant="medium" background="gray">
                <div>Серая кнопка</div>
            </ButtonUI>
            <PreviewPoster />
            <SpoilerUI toggleButtonTexts={['Развернуть', 'Свернуть']} buttonTextColor="faded">
                <p>
                    Каждый день миллионы людей ищут фильмы онлайн, и никто не хочет усложнять себе жизнь – и вы
                    наверняка один из них! А раз так, то Иви – это именно тот ресурс, который вам нужен. От лучших
                    кинолент в HD-качестве вас отделяет буквально один клик. Мы не просто освобождаем от необходимости
                    идти в кинотеатр или изучать программу телепередач – у посетителей нашего ресурса гораздо больше
                    возможностей.
                </p>
                <p>
                    Выбор фильмов очень широк и многообразен, так что каждый найдет для себя что-то интересное, каким бы
                    ни были его вкусы. Предпочитаете картины исключительно <a href="/movies/foreign">зарубежного</a>{' '}
                    производства? У нас их предостаточно: это и золотая классика Голливуда, и душевные французские
                    комедии, и темпераментные итальянские драмы, и шумные индийские музыкальные фильмы. А может, вы
                    патриот и любите{' '}
                    <a title="Российские фильмы онлайн" href="/movies/ru">
                        российские фильмы
                    </a>
                    ? Что ж, и таких фильмов у нас немало. Что вам больше по вкусу – добрая старая классика или{' '}
                    <a title="Фильмы новинки кинопроката онлайн" href="/new">
                        новинки кинопроката
                    </a>
                    ? Неважно, каким будет ваш ответ – у нас есть все, как картины эпохи зарождения кинематографа, так{' '}
                    <a title="Смотреть фильмы 2016 года онлайн" href="/movies/2016">
                        2016 года
                    </a>{' '}
                    и{' '}
                    <a title="Фильмы 2015 года" href="/movies/2015">
                        фильмы 2015
                    </a>
                    .
                </p>
            </SpoilerUI>
            <LinkUI linkTo="https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e" shape="round">
                <img
                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg"
                    alt="Social media logo"
                />
            </LinkUI>
            <LinkUI linkTo="https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e" shape="rectangular">
                <img src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg" alt="Store logo" />
                <div className={variables.text__block}>
                    <div>Загрузить в</div>
                    <div>App Store</div>
                </div>
            </LinkUI>
            <LinkUI linkTo="#" shape="rectangular">
                <div className={variables.text__single}>
                    <Image src={devicesIcon} alt="Devices logo" />
                    Все устройства
                </div>
            </LinkUI>
            <div className={vars.film__container}>
                <div className={vars.film__container_inner}>
                    <FilmographyItem />
                </div>
            </div>

            <MoviesSlider
                list={[
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 5 },
                    { id: 6 },
                    { id: 7 },
                    { id: 8 },
                    { id: 9 },
                    { id: 10 },
                    { id: 11 },
                    { id: 12 },
                    { id: 13 },
                    { id: 14 },
                ]}
            />
        </>
    );
}

export default HomePage;

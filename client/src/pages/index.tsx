import ButtonUI from "@/components/UI/Button/ButtonUI"
import ExpandedListUI from '@/components/UI/ExpandedList/ExpandedListUI'
import AppStoreLinkUI from '@/components/UI/Link/AppStoreLinkUI'
import SocialLinkUI from '@/components/UI/Link/SocialLinkUI'
import styles from '@/styles/pages/HomePage.module.scss'

function HomePage() {
    return (
        <>
            <ButtonUI
                className="button"
                variant="large"
                background="lightRed">
                <div>Красная кнопка</div>
            </ButtonUI>
            <ButtonUI
                className="button"
                variant="medium"
                background="gray">
                <div>Серая кнопка</div>
            </ButtonUI>
            <ExpandedListUI toggleButtonTexts={['Развернуть', 'Свернуть']}>
                <p>Каждый день миллионы людей ищут фильмы онлайн, и никто не хочет усложнять себе жизнь – и вы наверняка один из них! А раз так, то Иви – это именно тот ресурс, который вам нужен. От лучших кинолент в HD-качестве вас отделяет буквально один клик. Мы не просто освобождаем от необходимости идти в кинотеатр или изучать программу телепередач – у посетителей нашего ресурса гораздо больше возможностей.</p>
                <p>Выбор фильмов очень широк и многообразен, так что каждый найдет для себя что-то интересное, каким бы ни были его вкусы. Предпочитаете картины исключительно <a href="/movies/foreign">зарубежного</a> производства? У нас их предостаточно: это и золотая классика Голливуда, и душевные французские комедии, и темпераментные итальянские драмы, и шумные индийские музыкальные фильмы. А может, вы патриот и любите <a title="Российские фильмы онлайн" href="/movies/ru">российские фильмы</a>? Что ж, и таких фильмов у нас немало. Что вам больше по вкусу – добрая старая классика или <a title="Фильмы новинки кинопроката онлайн" href="/new">новинки кинопроката</a>? Неважно, каким будет ваш ответ – у нас есть все, как картины эпохи зарождения кинематографа, так <a title="Смотреть фильмы 2016 года онлайн" href="/movies/2016">2016 года</a> и <a title="Фильмы 2015 года" href="/movies/2015">фильмы 2015</a>.</p>
            </ExpandedListUI>
            <SocialLinkUI 
                href="https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e"
                logo='https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg' />
            <AppStoreLinkUI 
                href='https://go.onelink.me/app/devicesAndroid'
                logo='https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/googlePlayLogo.svg'
                linkTexts={['Доступно в', 'Google Play']} />
        </>
    )
}

export default HomePage
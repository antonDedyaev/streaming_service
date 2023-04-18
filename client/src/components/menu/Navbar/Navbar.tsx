import Link from 'next/link';
import Image from 'next/image';
import appleIcon from '@/../public/icons/logo.svg';
import searchIcon from '@/../public/icons/search.svg';
import bellIcon from '@/../public/icons/bell.svg';
import userIcon from '@/../public/icons/user.svg';
import MenuList from '@/components/menu/MenuList/MenuList';
import styles from '@/components/menu/Navbar/Navbar.module.scss';
import ButtonUI from '@/components/UI/Button/ButtonUI';
import DropMenu from '../DropMenu/DropMenu';
import { useEffect, useState } from 'react';

interface NavbarProps {
    page: 'home' | 'other';
}

function Navbar({ page }: NavbarProps) {
    const [isShowMoviesDrop, setIsShowMoviesDrop] = useState<boolean>(false);
    const [isShowSeriesDrop, setIsShowSeriesDrop] = useState<boolean>(false);
    const [isShowCartoonDrop, setIsShowCartoonDrop] = useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

    const clearShowHandler = () => {
        setIsShowMoviesDrop(false);
        setIsShowSeriesDrop(false);
        setIsShowCartoonDrop(false);
    }

    const mouseOverMovieHandler = () => {
        clearShowHandler()
        setIsShowMoviesDrop(true);
    };

    const mouseOverSeriesHandler = () => {
        clearShowHandler()
        setIsShowSeriesDrop(true);
    };

    const mouseOverСartoonHandler = () => {
        clearShowHandler()
        setIsShowCartoonDrop(true);
    };

    const clearMouseHandlers = (event: React.MouseEvent<HTMLDivElement>) => {
        clearShowHandler()
    };

    useEffect(() => {
        if (isShowMoviesDrop || isShowSeriesDrop || isShowCartoonDrop) {
            setIsMouseOver(true);
        } else {
            setIsMouseOver(false);
        }
    }, [isShowMoviesDrop, isShowSeriesDrop, isShowCartoonDrop]);

    return (
        <div onMouseLeave={clearMouseHandlers} className="container">
            <div
                className={[
                    styles.container,
                    styles[`container_${page}`],
                    isMouseOver ? styles.container_mouseOver : '',
                ].join(' ')}
            >
                <Link className={styles.container__logo} href={'/'}>
                    <Image src={appleIcon} alt="ivi"></Image>
                </Link>

                <MenuList
                    className={styles.container__menu}
                    links={[
                        { 
                            href: '/', 
                            text: 'Мой Иви',
                            onMouseOver: clearShowHandler
                        },
                        { 
                            href: '/', 
                            text: 'Что нового',
                            onMouseOver: clearShowHandler
                        },
                        {
                            href: '/',
                            text: 'Фильмы',
                            onMouseOver: mouseOverMovieHandler,
                            className: [styles.container__menuLink, styles.container__menuLink_movie].join(' '),
                        },
                        {
                            href: '/',
                            text: 'Сериалы',
                            onMouseOver: mouseOverSeriesHandler,
                            className: [styles.container__menuLink, styles.container__menuLink_series].join(' '),
                        },
                        {
                            href: '/',
                            text: 'Мультфильмы',
                            onMouseOver: mouseOverСartoonHandler,
                            className: [styles.container__menuLink, styles.container__menuLink_cartoon].join(' '),
                        },
                        { 
                            href: '/', 
                            text: 'TV+',
                            onMouseOver: clearShowHandler
                        },
                    ]}
                />

                <div className={styles.container__rightSide}>
                    <ButtonUI className={styles.container__button} background="lightRed" variant="small">
                        Смотреть 30 дней бесплатно
                    </ButtonUI>

                    <button className={styles.container__search}>
                        <Image className={styles.container__icon} src={searchIcon} alt="" />
                        <p className={styles.container__text}>Поиск</p>
                    </button>

                    <Link href={'/'} className={[styles.container__link, styles.container__link_bell].join(' ')}>
                        <Image className={styles.container__icon} src={bellIcon} alt="Уведомления" />
                    </Link>

                    <Link href={'/'} className={[styles.container__link, styles.container__link_user].join(' ')}>
                        <Image
                            className={[styles.container__icon, styles.container__icon_user].join(' ')}
                            src={userIcon}
                            alt="Уведомления"
                        />
                    </Link>
                </div>

                <DropMenu
                    className={[styles.container__dropMenu, isMouseOver ? styles.container__dropMenu_show : ''].join(
                        ' ',
                    )}
                    content={
                        isShowMoviesDrop ?
                        [
                            {
                                title: 'Жанры',
                                genres: [
                                    { name: 'фильм', href: '/' },
                                    { name: 'фильм', href: '/' },
                                    { name: 'фильм', href: '/' },
                                    { name: 'фильм', href: '/' },
                                    { name: 'фильм', href: '/' },
                                    { name: 'фильм', href: '/' },
                                ],
                            },
                            {
                                title: 'Страны',
                                genres: [
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                ],
                            },
                            {
                                title: 'Годы',
                                genres: [
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                ],
                            },
                        ]
                        :
                        isShowSeriesDrop
                        ?
                        [
                            {
                                title: 'Жанры',
                                genres: [
                                    { name: 'Сериал', href: '/' },
                                    { name: 'Сериал', href: '/' },
                                    { name: 'Сериал', href: '/' },
                                    { name: 'Сериал', href: '/' },
                                    { name: 'Сериал', href: '/' },
                                    { name: 'Сериал', href: '/' },
                                ],
                            },
                            {
                                title: 'Страны',
                                genres: [
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                ],
                            },
                            {
                                title: 'Годы',
                                genres: [
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                ],
                            },
                        ]
                        :
                        [
                            {
                                title: 'Жанры',
                                genres: [
                                    { name: 'Мультик', href: '/' },
                                    { name: 'Мультик', href: '/' },
                                    { name: 'Мультик', href: '/' },
                                    { name: 'Мультик', href: '/' },
                                    { name: 'Мультик', href: '/' },
                                    { name: 'Мультик', href: '/' },
                                ],
                            },
                            {
                                title: 'Страны',
                                genres: [
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                    { name: 'Страна', href: '/' },
                                ],
                            },
                            {
                                title: 'Годы',
                                genres: [
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                    { name: 'Год', href: '/' },
                                ],
                            },
                        ]
                    }
                />
            </div>
        </div>
    );
}

export default Navbar;

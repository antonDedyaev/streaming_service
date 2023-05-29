import Link from 'next/link';
import Image from 'next/image';
import appleIcon from '../../../../public/icons/logo.svg';
import searchIcon from '../../../../public/icons/search.svg';
import bellIcon from '../../../../public/icons/bell.svg';
import userIcon from '../../../../public/icons/user.svg';
import LinksList from '../LinksList/LinksList';
import styles from './Header.module.scss';
import DropMenu from '../DropMenu/DropMenu';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextLinkUI from '@/components/UI/links/TextLink/TextLinkUI';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import IGenre from '@/models/IGenre';
import { getGenresAndCountries } from '@/store/ActionCreators';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';

interface HeaderProps {
    page: 'home' | 'other';
}

const Header = ({ page }: HeaderProps) => {
    const { t } = useTranslation('header');
    const [isShowMoviesDrop, setIsShowMoviesDrop] = useState<boolean>(false);
    const [isShowSeriesDrop, setIsShowSeriesDrop] = useState<boolean>(false);
    const [isShowCartoonDrop, setIsShowCartoonDrop] = useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

    const { asPath, locale } = useRouter();

    const currentLocale = locale === 'ru' ? 'en' : 'ru';

    const clearShowHandler = () => {
        setIsShowMoviesDrop(false);
        setIsShowSeriesDrop(false);
        setIsShowCartoonDrop(false);
    };

    const mouseOverMovieHandler = () => {
        clearShowHandler();
        setIsShowMoviesDrop(true);
    };

    const mouseOverSeriesHandler = () => {
        clearShowHandler();
        setIsShowSeriesDrop(true);
    };

    const mouseOverСartoonHandler = () => {
        clearShowHandler();
        setIsShowCartoonDrop(true);
    };

    const clearMouseHandlers = () => {
        clearShowHandler();
    };

    useEffect(() => {
        if (isShowMoviesDrop || isShowSeriesDrop || isShowCartoonDrop) {
            setIsMouseOver(true);
        } else {
            setIsMouseOver(false);
        }
    }, [isShowMoviesDrop, isShowSeriesDrop, isShowCartoonDrop]);

    const { geners, countries } = useAppSelector((state) => state.immutableObj);

    const genersLinks = () => {
        const array: {
            text: string;
            href: string;
        }[] = [];
        geners.forEach((genre) => {
            array.push({ text: locale == 'ru' ? genre.name : genre.enName, href: `/collections/1${genre.enName}` });
        });
        return array;
    };

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

                <div className={styles.container__menuList}>
                    <LinksList
                        direction="row"
                        links={[
                            {
                                href: '/',
                                text: t('myIvi'),
                                option: 'dim',
                                onMouseOver: clearShowHandler,
                            },
                            {
                                href: 'https://www.ivi.ru/new',
                                text: t('latest'),
                                option: 'dim',
                                onMouseOver: clearShowHandler,
                                target: '_blank',
                            },
                            {
                                href: '/movies',
                                text: t('movies'),
                                option: 'dim',
                                onMouseOver: mouseOverMovieHandler,
                                className: [styles.container__menuLink, styles.container__menuLink_movie].join(' '),
                            },
                            {
                                href: 'https://www.ivi.ru/series',
                                text: t('tvShows'),
                                option: 'dim',
                                /*onMouseOver: mouseOverSeriesHandler,
                                className: [styles.container__menuLink, styles.container__menuLink_series].join(' '),*/
                                onMouseOver: clearShowHandler,
                                target: '_blank',
                            },
                            {
                                href: 'https://www.ivi.ru/animation',
                                text: t('cartoons'),
                                option: 'dim',
                                /*onMouseOver: mouseOverСartoonHandler,
                                className: [styles.container__menuLink, styles.container__menuLink_cartoon].join(' '),*/
                                onMouseOver: clearShowHandler,
                                target: '_blank',
                            },
                            {
                                href: 'https://www.ivi.ru/tvplus',
                                text: t('broadcast'),
                                option: 'dim',
                                onMouseOver: clearShowHandler,
                                target: '_blank',
                            },
                        ]}
                    />
                </div>

                <div className={styles.container__rightSide}>
                    <ColoredButton color="red" size="small" className={styles.container__button}>
                        {t('freePeriod')}
                    </ColoredButton>

                    <TextLinkUI href={`${asPath}?ivi_search`} option="bright" className={styles.container__search}>
                        <Image className={styles.container__icon} src={searchIcon} alt="" />
                        <p className={styles.container__text}>{t('search')}</p>
                    </TextLinkUI>

                    <Link href={'/'} className={[styles.container__link, styles.container__link_bell].join(' ')}>
                        <Image className={styles.container__icon} src={bellIcon} alt="Уведомления" />
                    </Link>

                    <Link
                        href={asPath}
                        locale={currentLocale}
                        className={[styles.container__link, styles.container__link_locale].join(' ')}
                    >
                        {currentLocale}
                    </Link>

                    <Link
                        href={`${asPath}?sign-in`}
                        className={[styles.container__link, styles.container__link_user].join(' ')}
                    >
                        <Image
                            className={[styles.container__icon, styles.container__icon_user].join(' ')}
                            src={userIcon}
                            alt="Пользователь"
                        />
                    </Link>
                </div>

                <DropMenu
                    className={[styles.container__dropMenu, isMouseOver ? styles.container__dropMenu_show : ''].join(
                        ' ',
                    )}
                    content={
                        isShowMoviesDrop
                            ? [
                                  {
                                      title: t('dropmenu.genres'),
                                      links: genersLinks(),

                                      /*[
                                          { text: 'фильм', href: '/' },
                                          { text: 'фильм', href: '/' },
                                          { text: 'фильм', href: '/' },
                                          { text: 'фильм', href: '/' },
                                          { text: 'фильм', href: '/' },
                                          { text: 'фильм', href: '/' },
                                      ]*/
                                  },
                                  {
                                      title: t('dropmenu.countries'),
                                      links: [
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                      ],
                                  },
                                  {
                                      title: t('dropmenu.years'),
                                      links: [
                                          { text: 'Фильмы 2023 года', href: '/collections/2023' },
                                          { text: 'Фильмы 2022 года', href: '/collections/2022' },
                                          { text: 'Фильмы 2021 года', href: '/collections/2021' },
                                          { text: 'Фильмы 2020 года', href: '/collections/2020' },
                                          { text: 'Фильмы 2019 года', href: '/collections/2019' },
                                          { text: 'Фильмы 2018 года', href: '/collections/2018' },
                                      ],
                                  },
                              ]
                            : [] /*isShowSeriesDrop
                            ? [
                                  {
                                      title: t('dropmenu.genres'),
                                      links: [
                                          { text: 'сериал', href: '/' },
                                          { text: 'сериал', href: '/' },
                                          { text: 'сериал', href: '/' },
                                          { text: 'сериал', href: '/' },
                                          { text: 'сериал', href: '/' },
                                          { text: 'сериал', href: '/' },
                                      ],
                                  },
                                  {
                                      title: t('dropmenu.countries'),
                                      links: [
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                      ],
                                  },
                                  {
                                      title: t('dropmenu.years'),
                                      links: [
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                      ],
                                  },
                              ]
                            : [
                                  {
                                      title: t('dropmenu.genres'),
                                      links: [
                                          { text: 'мультфильм', href: '/' },
                                          { text: 'мультфильм', href: '/' },
                                          { text: 'мультфильм', href: '/' },
                                          { text: 'мультфильм', href: '/' },
                                          { text: 'мультфильм', href: '/' },
                                          { text: 'мультфильм', href: '/' },
                                      ],
                                  },
                                  {
                                      title: t('dropmenu.countries'),
                                      links: [
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                          { text: 'Страна', href: '/' },
                                      ],
                                  },
                                  {
                                      title: t('dropmenu.years'),
                                      links: [
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                          { text: 'Год', href: '/' },
                                      ],
                                  },
                              ]*/
                    }
                />
            </div>
        </div>
    );
};

export default Header;

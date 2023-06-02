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
import { useAppSelector } from '@/store/hooks/redux';

interface HeaderProps {
    page: 'home' | 'other';
}

const Header = ({ page }: HeaderProps) => {
    const { t } = useTranslation('header');
    const [isShowMoviesDrop, setIsShowMoviesDrop] = useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

    const { asPath, locale } = useRouter();

    const currentLocale = locale === 'ru' ? 'en' : 'ru';

    const clearShowHandler = () => {
        setIsShowMoviesDrop(false);
    };

    const mouseOverMovieHandler = () => {
        clearShowHandler();
        setIsShowMoviesDrop(true);
    };

    const clearMouseHandlers = () => {
        clearShowHandler();
    };

    useEffect(() => {
        if (isShowMoviesDrop) {
            setIsMouseOver(true);
        } else {
            setIsMouseOver(false);
        }
    }, [isShowMoviesDrop]);

    const { genres } = useAppSelector((state) => state.staticData);

    const genersLinks = () => {
        const array: {
            text: string;
            href: string;
        }[] = [];
        genres.forEach((genre) => {
            array.push({ text: locale == 'ru' ? genre.name : genre.enName, href: `/collections/${genre.enName}` });
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
                                  },
                                  {
                                      title: t('dropmenu.countries'),
                                      links: [
                                          {
                                              text: locale === 'ru' ? 'Русские' : 'Russian',
                                              href: '/collections/Russia',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Зарубежные' : 'Foreign',
                                              href: '/collections/foreign',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Советское кино' : 'USSR movie',
                                              href: '/collections/USSR',
                                          },
                                      ],
                                  },
                                  {
                                      title: t('dropmenu.years'),
                                      links: [
                                          {
                                              text: locale === 'ru' ? 'Фильмы 2023 года' : 'Movies 2023',
                                              href: '/collections/2023',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Фильмы 2022 года' : 'Movies 2022',
                                              href: '/collections/2022',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Фильмы 2021 года' : 'Movies 2021',
                                              href: '/collections/2021',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Фильмы 2020 года' : 'Movies 2020',
                                              href: '/collections/2020',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Фильмы 2019 года' : 'Movies 2019',
                                              href: '/collections/2019',
                                          },
                                          {
                                              text: locale === 'ru' ? 'Фильмы 2018 года' : 'Movies 2018',
                                              href: '/collections/2018',
                                          },
                                      ],
                                  },
                              ]
                            : []
                    }
                />
            </div>
        </div>
    );
};

export default Header;

import { FC, useState } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import TextLinkUI from '../../UI/links/TextLink/TextLinkUI';
import ShapedLinkUI from '../../UI/links/ShapedLink/ShapedLinkUI';
import mailIcon from '../../../../public/icons/link/mail.svg';
import phoneIcon from '../../../../public/icons/link/phone.svg';
import loudspeaker from '../../../../public/icons/link/loudspeaker.svg';
import tvIcon from '../../../../public/icons/link/devices_tv.svg';
import devicesIcon from '../../../../public/icons/link/devices_all.svg';
import ButtonUI from '../../UI/buttons/Button/ButtonUI';
import LinksList from '../LinksList/LinksList';

const Footer: FC = () => {
    const [phoneIsHidden, setPhoneIsHidden] = useState(true);
    return (
        <footer className={styles.container}>
            <div className="container">
                <div className={[styles.container__content, styles.container__content_columnNarrow].join(' ')}>
                    <div>
                        <span className={styles.container__title}>О нас</span>
                        <LinksList
                            direction="column"
                            links={[
                                {
                                    href: '#!',
                                    text: 'О компании',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Вакансии',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Программа бета-тестирования',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Информация для партнёров',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Размещение рекламы',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Пользовательское соглашение',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Политика конфиденциальности',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Комплаенс',
                                    option: 'dim',
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <span className={styles.container__title}>Разделы</span>
                        <LinksList
                            direction="column"
                            links={[
                                {
                                    href: '#!',
                                    text: 'Мой Иви',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Что нового',
                                    option: 'dim',
                                },
                                {
                                    href: '/movies',
                                    text: 'Фильмы',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Сериалы',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Мультфильмы',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'TV+',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Что посмотреть',
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: 'Активация сертификата',
                                    option: 'gradient',
                                },
                            ]}
                        />
                    </div>

                    <div>
                        <span className={styles.container__title}>Служба поддержки</span>
                        <div className={styles.container__description}>
                            <span>Мы всегда готовы вам помочь.</span>
                            <span>Наши операторы онлайн 24/7</span>
                        </div>
                        <div className={styles.container__support}>
                            <ShapedLinkUI
                                href="https://www.ivi.ru/profile"
                                shape="rectangular"
                                className={styles.container__chatButton}
                            >
                                <div>Написать в чате</div>
                            </ShapedLinkUI>
                            <div className={styles.container__supportButtons}>
                                <ShapedLinkUI href="mailto:support@ivi.ru" shape="square">
                                    <Image src={mailIcon} height={16} width={16} alt="Иконка почты" />
                                </ShapedLinkUI>
                                <ButtonUI
                                    background="gray"
                                    shape="square"
                                    className={[styles.container__button, styles.container__button_size].join(' ')}
                                    onClick={() => setPhoneIsHidden(!phoneIsHidden)}
                                >
                                    <Image src={phoneIcon} height={16} width={16} alt="Иконка телефона" />
                                </ButtonUI>
                            </div>
                            <div
                                className={[
                                    styles.container__supportPhones,
                                    phoneIsHidden
                                        ? null
                                        : [styles.container__supportPhones, styles.container__supportPhones_shown].join(
                                              ' ',
                                          ),
                                ].join(' ')}
                            >
                                <a className={styles.container__phoneItem} href="tel:88002344923" rel="nofollow">
                                    <div className={styles.container__phoneNumber}>8 800 234-49-23</div>
                                    <div className={styles.container__description}>Бесплатно по России</div>
                                </a>
                            </div>
                            <ul className={styles.container__questions}>
                                <li>
                                    <TextLinkUI
                                        href="https://ask.ivi.ru/"
                                        option="bright"
                                        className={[styles.container__title, styles.container__title_askText].join(' ')}
                                    >
                                        ask.ivi.ru
                                    </TextLinkUI>
                                    <p className={styles.container__description}>Ответы на вопросы</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className={styles.container__footerWidget}>
                            <div className={styles.container__iconSection}>
                                <Image
                                    src={loudspeaker}
                                    height={76}
                                    width={76}
                                    alt="Иконка перечеркнутого громкоговорителя"
                                />
                            </div>
                            <p className={styles.container__text}>Смотрите фильмы, сериалы и мультфильмы без рекламы</p>
                        </div>
                    </div>
                </div>
                <div className={[styles.container__content, styles.container__content_columnWide].join(' ')}>
                    <div>
                        <div className={styles.container__stores}>
                            <ShapedLinkUI href="https://go.onelink.me/app/devicesiOS" shape="rectangular">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип AppStore"
                                />
                                <div className={styles.container__textBlock}>
                                    <div>Загрузить в</div>
                                    <div>App Store</div>
                                </div>
                            </ShapedLinkUI>
                            <ShapedLinkUI href="https://go.onelink.me/app/devicesAndroid" shape="rectangular">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/googlePlayLogo.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип Google Play"
                                />
                                <div className={styles.container__textBlock}>
                                    <div>Доступно в</div>
                                    <div>Google Play</div>
                                </div>
                            </ShapedLinkUI>
                            <ShapedLinkUI href="#!" shape="rectangular">
                                <Image src={tvIcon} height={20} width={20} alt="Иконка телевизора" />
                                <div className={styles.container__textBlock}>
                                    <div>Смотрите на</div>
                                    <div>Smart TV</div>
                                </div>
                            </ShapedLinkUI>
                            <ShapedLinkUI href="#!" shape="rectangular">
                                <div
                                    className={[styles.container__textBlock, styles.container__textBlock_single].join(
                                        ' ',
                                    )}
                                >
                                    <Image src={devicesIcon} height={20} width={20} alt="Иконка умных устройств" />
                                    Все устройства
                                </div>
                            </ShapedLinkUI>
                        </div>
                        <div className={styles.container__copyrightsContainer}>
                            <p className={[styles.container__copyrights, styles.container__copyrights_site].join(' ')}>
                                <span>©&nbsp;</span>
                                <span>2023</span>
                                <span> ООО «Иви.ру»</span>
                            </p>
                            <p
                                className={[styles.container__copyrights, styles.container__copyrights_content].join(
                                    ' ',
                                )}
                            >
                                HBO ® and related service marks are the property of Home Box Office, Inc
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.container__community}>
                            <ShapedLinkUI
                                href="https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e"
                                shape="round"
                            >
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип ВКонтакте"
                                />
                            </ShapedLinkUI>
                            <ShapedLinkUI href="https://ok.ru/ivi.ru" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_odnoklassniki.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Одноклассники"
                                />
                            </ShapedLinkUI>
                            <ShapedLinkUI href="https://twitter.com/ivi_ru" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_twitter.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Twitter"
                                />
                            </ShapedLinkUI>
                            <ShapedLinkUI href="https://vb.me/a0544c" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_viber.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Viber"
                                />
                            </ShapedLinkUI>
                            <ShapedLinkUI href="https://www.linkedin.com/company/2543415/" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_linkedin.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип LinkedIn"
                                />
                            </ShapedLinkUI>
                            <ShapedLinkUI href="https://t.me/official_iviru" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_telegram.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Telegram"
                                />
                            </ShapedLinkUI>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

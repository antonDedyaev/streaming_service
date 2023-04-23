import { FC, useState } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import TextLinkUI from '../UI/links/TextLink/TextLinkUI';
import LinkUI from '../UI/links/Link/LinkUI';
import mailIcon from '../../../public/icons/link/mail.svg';
import phoneIcon from '../../../public/icons/link/phone.svg';
import loudspeaker from '../../../public/icons/link/loudspeaker.svg';
import tvIcon from '../../../public/icons/link/devices_tv.svg';
import devicesIcon from '../../../public/icons/link/devices_all.svg';
import ButtonUI from '../UI/buttons/Button/ButtonUI';
import MenuList from './MenuList';

const Footer: FC = () => {
    const [phoneIsHidden, setPhoneIsHidden] = useState(true);
    return (
        <footer className={styles.iviFooter}>
            <div className="container">
                <div className={styles.iviFooter__content}>
                    <div className={styles.columnNarrow}>
                        <span className={styles.iviFooter__title}>О нас</span>
                        <MenuList
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
                    <div className={styles.columnNarrow}>
                        <span className={styles.iviFooter__title}>Разделы</span>
                        <MenuList
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

                    <div className={styles.columnNarrow}>
                        <span className={styles.iviFooter__title}>Служба поддержки</span>
                        <div className={styles.iviFooter__description}>
                            <span>Мы всегда готовы вам помочь.</span>
                            <span>Наши операторы онлайн 24/7</span>
                        </div>
                        <div className={styles.iviFooter__support}>
                            <LinkUI
                                href="https://www.ivi.ru/profile"
                                shape="rectangular"
                                className={styles.iviFooter__support_sizeWide}
                            >
                                <div>Написать в чате</div>
                            </LinkUI>
                            <div className={styles.iviFooter__supportButtons}>
                                <LinkUI href="mailto:support@ivi.ru" shape="square">
                                    <Image src={mailIcon} height={16} width={16} alt="Иконка почты" />
                                </LinkUI>
                                <ButtonUI
                                    background="gray"
                                    shape="square"
                                    className={styles.iviFooter__buttonSize}
                                    onClick={() => setPhoneIsHidden(!phoneIsHidden)}
                                >
                                    <Image src={phoneIcon} height={16} width={16} alt="Иконка телефона" />
                                </ButtonUI>
                            </div>
                            <div
                                className={[
                                    styles.iviFooter__supportPhones,
                                    phoneIsHidden ? null : styles.iviFooter__supportPhones_shown,
                                ].join(' ')}
                            >
                                <a className={styles.iviFooter__phoneItem} href="tel:88002344923" rel="nofollow">
                                    <div className={styles.iviFooter__phoneNumber}>8 800 234-49-23</div>
                                    <div className={styles.iviFooter__description}>Бесплатно по России</div>
                                </a>
                            </div>
                            <ul className={styles.iviFooter__questions}>
                                <li>
                                    <TextLinkUI
                                        href="https://ask.ivi.ru/"
                                        option="bright"
                                        className={styles.iviFooter__title_textWhite}
                                    >
                                        ask.ivi.ru
                                    </TextLinkUI>
                                    <p className={styles.iviFooter__description}>Ответы на вопросы</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.columnNarrow}>
                        <div className={styles.footerWidget}>
                            <div className={styles.footerWidget__iconSection}>
                                <Image
                                    src={loudspeaker}
                                    height={76}
                                    width={76}
                                    alt="Иконка перечеркнутого громкоговорителя"
                                />
                            </div>
                            <p className={styles.footerWidget__text}>
                                Смотрите фильмы, сериалы и мультфильмы без рекламы
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.iviFooter__content}>
                    <div className={styles.columnWide}>
                        <div className={styles.iviFooter__stores}>
                            <LinkUI href="https://go.onelink.me/app/devicesiOS" shape="rectangular">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип AppStore"
                                />
                                <div className={styles.iviFooter__textBlock}>
                                    <div>Загрузить в</div>
                                    <div>App Store</div>
                                </div>
                            </LinkUI>
                            <LinkUI href="https://go.onelink.me/app/devicesAndroid" shape="rectangular">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/googlePlayLogo.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип Google Play"
                                />
                                <div className={styles.iviFooter__textBlock}>
                                    <div>Доступно в</div>
                                    <div>Google Play</div>
                                </div>
                            </LinkUI>
                            <LinkUI href="#!" shape="rectangular">
                                <Image src={tvIcon} height={20} width={20} alt="Иконка телевизора" />
                                <div className={styles.iviFooter__textBlock}>
                                    <div>Смотрите на</div>
                                    <div>Smart TV</div>
                                </div>
                            </LinkUI>
                            <LinkUI href="#!" shape="rectangular">
                                <div className={styles.iviFooter__textSingle}>
                                    <Image src={devicesIcon} height={20} width={20} alt="Иконка умных устройств" />
                                    Все устройства
                                </div>
                            </LinkUI>
                        </div>
                        <div className={styles.iviFooter__copyrights}>
                            <p className={styles.iviFooter__copyrightsSite}>
                                <span>©&nbsp;</span>
                                <span>2023</span>
                                <span>&nbsp;ООО «Иви.ру»</span>
                            </p>
                            <p className={styles.iviFooter__copyrightsContent}>
                                HBO ® and related service marks are the property of Home Box Office, Inc
                            </p>
                        </div>
                    </div>
                    <div className={styles.columnWide}>
                        <div className={styles.iviFooter__community}>
                            <LinkUI href="https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип ВКонтакте"
                                />
                            </LinkUI>
                            <LinkUI href="https://ok.ru/ivi.ru" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_odnoklassniki.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Одноклассники"
                                />
                            </LinkUI>
                            <LinkUI href="https://twitter.com/ivi_ru" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_twitter.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Twitter"
                                />
                            </LinkUI>
                            <LinkUI href="https://vb.me/a0544c" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_viber.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Viber"
                                />
                            </LinkUI>
                            <LinkUI href="https://www.linkedin.com/company/2543415/" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_linkedin.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип LinkedIn"
                                />
                            </LinkUI>
                            <LinkUI href="https://t.me/official_iviru" shape="round">
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_telegram.svg"
                                    height={16}
                                    width={16}
                                    alt="Логотип Telegram"
                                />
                            </LinkUI>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

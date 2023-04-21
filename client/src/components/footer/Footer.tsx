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

const Footer: FC = () => {
    const [phoneIsHidden, setPhoneIsHidden] = useState(true);
    return (
        <footer className={styles.iviFooter}>
            <div className="container">
                <div className={styles.iviFooter__content}>
                    <div className={[styles.iviFooter__column, styles.iviFooter__column_sizeNarrow].join(' ')}>
                        <span className={styles.iviFooter__title}>О нас</span>
                        <ul className={styles.iviFooter__linkList}>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    О компании
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Вакансии
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Программа бета-тестирования
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Информация для партнёров
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Размещение рекламы
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Пользовательское соглашение
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Политика конфиденциальности
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Комплаенс
                                </TextLinkUI>
                            </li>
                        </ul>
                    </div>
                    <div className={[styles.iviFooter__column, styles.iviFooter__column_sizeNarrow].join(' ')}>
                        <span className={styles.iviFooter__title}>Разделы</span>
                        <ul className={styles.iviFooter__linkList}>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="/" option="dim">
                                    Мой Иви
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Что нового
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="/movies" option="dim">
                                    Фильмы
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Сериалы
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Мультфильмы
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    TV+
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="dim">
                                    Что посмотреть
                                </TextLinkUI>
                            </li>
                            <li className={styles.iviFooter__linkItem}>
                                <TextLinkUI href="#!" option="gradient">
                                    Активация сертификата
                                </TextLinkUI>
                            </li>
                        </ul>
                    </div>
                    <div className={[styles.iviFooter__column, styles.iviFooter__column_sizeNarrow].join(' ')}>
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
                    <div className={[styles.iviFooter__column, styles.iviFooter__column_sizeNarrow].join(' ')}>
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
                    <div className={[styles.iviFooter__column, styles.iviFooter__column_sizeWide].join(' ')}>
                        <div className={styles.iviFooter__stores}>
                            <LinkUI
                                href="https://go.onelink.me/app/devicesiOS"
                                shape="rectangular"
                                className={styles.iviFooter__storeLink}
                            >
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/appleLogo.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип AppStore"
                                />
                                <div className={styles.iviFooter__storeLink_textBlock}>
                                    <div>Загрузить в</div>
                                    <div>App Store</div>
                                </div>
                            </LinkUI>
                            <LinkUI
                                href="https://go.onelink.me/app/devicesAndroid"
                                shape="rectangular"
                                className={styles.iviFooter__storeLink}
                            >
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/googlePlayLogo.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип Google Play"
                                />
                                <div className={styles.iviFooter__storeLink_textBlock}>
                                    <div>Доступно в</div>
                                    <div>Google Play</div>
                                </div>
                            </LinkUI>
                            <LinkUI href="#!" shape="rectangular" className={styles.iviFooter__storeLink}>
                                <Image src={tvIcon} height={20} width={20} alt="Иконка телевизора" />
                                <div className={styles.iviFooter__storeLink_textBlock}>
                                    <div>Смотрите на</div>
                                    <div>Smart TV</div>
                                </div>
                            </LinkUI>
                            <LinkUI href="#!" shape="rectangular" className={styles.iviFooter__storeLink}>
                                <div className={styles.iviFooter__storeLink_textSingle}>
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
                    <div className={[styles.iviFooter__column, styles.iviFooter__column_sizeWide].join(' ')}>
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

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
import ColoredButton from '../../UI/buttons/ColoredButton/ColoredButton';
import LinksList from '../LinksList/LinksList';
import { useTranslation } from 'next-i18next';

const Footer: FC = () => {
    const { t } = useTranslation('footer');
    const [phoneIsHidden, setPhoneIsHidden] = useState(true);
    return (
        <footer className={styles.container} data-testid={'footer'}>
            <div className="container">
                <div className={[styles.container__content, styles.container__content_columnNarrow].join(' ')}>
                    <div>
                        <span className={styles.container__title}>{t('about.title')}</span>
                        <LinksList
                            direction="column"
                            links={[
                                {
                                    href: '#!',
                                    text: t('about.company'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.vacancies'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.betaTests'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.forPartners'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.advertising'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.userAgreement'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.confidentiality'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('about.compliance'),
                                    option: 'dim',
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <span className={styles.container__title}>{t('categories.title')}</span>
                        <LinksList
                            direction="column"
                            links={[
                                {
                                    href: '#!',
                                    text: t('categories.myIvi'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('categories.latest'),
                                    option: 'dim',
                                },
                                {
                                    href: '/movies',
                                    text: t('categories.movies'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('categories.tvShows'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('categories.cartoons'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('categories.broadcast'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('categories.recommendations'),
                                    option: 'dim',
                                },
                                {
                                    href: '#!',
                                    text: t('categories.certificate'),
                                    option: 'gradient',
                                },
                            ]}
                        />
                    </div>

                    <div>
                        <span className={styles.container__title}>{t('support.title')}</span>
                        <div className={styles.container__description}>
                            <span>{t('support.disclaimer.help')}</span>
                            <span>{t('support.disclaimer.operators')}</span>
                        </div>
                        <div className={styles.container__support}>
                            <ShapedLinkUI
                                href="https://www.ivi.ru/profile"
                                shape="rectangular"
                                className={styles.container__chatButton}
                            >
                                <div>{t('support.chat')}</div>
                            </ShapedLinkUI>
                            <div className={styles.container__supportButtons}>
                                <ShapedLinkUI href="mailto:support@ivi.ru" shape="square">
                                    <Image src={mailIcon} height={16} width={16} alt="Иконка почты" />
                                </ShapedLinkUI>
                                <ColoredButton
                                    size="small"
                                    color="gray"
                                    className={[styles.container__button, styles.container__button_size].join(' ')}
                                    onClick={() => setPhoneIsHidden(!phoneIsHidden)}
                                >
                                    <Image src={phoneIcon} height={16} width={16} alt="Иконка телефона" />
                                </ColoredButton>
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
                                    <div className={styles.container__description}>{t('support.freeCall')}</div>
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
                                    <p className={styles.container__description}>{t('support.FAQ')}</p>
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
                            <p className={styles.container__text}>{t('noAds')}</p>
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
                                    <div>{t('stores.appStore')}</div>
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
                                    <div>{t('stores.googlePlay')}</div>
                                    <div>Google Play</div>
                                </div>
                            </ShapedLinkUI>
                            <ShapedLinkUI href="#!" shape="rectangular">
                                <Image src={tvIcon} height={20} width={20} alt="Иконка телевизора" />
                                <div className={styles.container__textBlock}>
                                    <div>{t('stores.smartTV')}</div>
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
                                    {t('stores.allDevices')}
                                </div>
                            </ShapedLinkUI>
                        </div>
                        <div className={styles.container__copyrightsContainer}>
                            <p className={[styles.container__copyrights, styles.container__copyrights_site].join(' ')}>
                                <span>©&nbsp;</span>
                                <span>2023</span>
                                <span> {t('copyrights.ivi')}</span>
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

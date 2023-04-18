import Link from "next/link"
import Image from "next/image"
import appleIcon from '@/../public/icons/logo.svg'
import searchIcon from '@/../public/icons/search.svg'
import bellIcon from '@/../public/icons/bell.svg'
import userIcon from '@/../public/icons/user.svg'
import MenuList from "@/components/menu/MenuList/MenuList"
import styles from '@/components/menu/Navbar/Navbar.module.scss'
import ButtonUI from "@/components/UI/Button/ButtonUI"

function Navbar() {
    return (
        <div>
            <div className="container">
                <div className={styles.container}>
                    <Link
                        className={styles.container__logo}
                        href={'/'}>
                        <Image 
                            src={appleIcon} 
                            alt="ivi">
                        </Image>
                    </Link>

                    <MenuList
                        className={styles.container__menu}
                        links={[
                            {href: '/', text: 'Мой Иви'},
                            {href: '/', text: 'Что нового'},
                            {href: '/', text: 'Фильмы'},
                            {href: '/', text: 'Сериалы'},
                            {href: '/', text: 'Мультфильмы'},
                            {href: '/', text: 'TV+'}
                        ]}
                    />

                    <div className={styles.container__rightSide}>
                        <ButtonUI
                            className={styles.container__button}
                            background="lightRed"
                            variant="small">
                            Смотреть 30 дней бесплатно
                        </ButtonUI>

                        <button
                            className={styles.container__search}>
                            <div className={styles.container__textContainer}>
                                <Image className={styles.container__icon} src={searchIcon} alt=""/>
                                <p className={styles.container__text}>Поиск</p>
                            </div>
                        </button>

                        <Link
                            href={'/'}
                            className={[styles.container__link, styles.container__link_bell].join(' ')}>
                            <Image className={styles.container__icon} src={bellIcon} alt="Уведомления"/>
                        </Link>

                        <Link
                            href={'/'}
                            className={[styles.container__link, styles.container__link_user].join(' ')}>
                            <Image className={[styles.container__icon, styles.container__icon_user].join(' ')} src={userIcon} alt="Уведомления"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
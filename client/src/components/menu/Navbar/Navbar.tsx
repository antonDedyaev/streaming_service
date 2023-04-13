import Link from "next/link"
import Image from "next/image"
import appleIcon from '@/../public/icons/logo.svg'
import searchIcon from '@/../public/icons/search.svg'
import MenuList from "@/components/menu/MenuList/MenuList"
import styles from '@/styles/components/navbar/Navbar.module.scss'

function Navbar() {
    return (
        <div>
            <div className="container">
                <div className={styles.container}>
                    <Link href={'/'}>
                        <Image 
                            className={styles.container__logo} 
                            src={appleIcon} 
                            alt="ivi">
                        </Image>
                    </Link>

                    <MenuList links={[
                        {href: '/', text: 'Мой Иви'},
                        {href: '/', text: 'Что нового'},
                        {href: '/', text: 'Фильмы'},
                        {href: '/', text: 'Сериалы'},
                        {href: '/', text: 'Мультфильмы'},
                        {href: '/', text: 'TV+'}
                    ]}/>

                    <button
                        className={styles.search}>
                        <div className={styles.search__container}>
                            <Image className={styles.search__icon} src={searchIcon} alt=""/>
                            <p className={styles.search__text}>Поиск</p>
                        </div>
                    </button>

                    <button></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
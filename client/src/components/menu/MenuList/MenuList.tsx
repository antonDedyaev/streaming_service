import Link from "next/link"
import styles from '@/styles/components/navbar/MenuList.module.scss'

interface ILink {
    href: string
    text: string
}

interface MenuListProps {
    links: ILink[]
}

function MenuList({links}: MenuListProps) {
    return (
        <ul className={styles.container}>
            {links.map(link => (
                <li className={styles.container__item} key={link.text}>
                    <Link 
                        className={styles.container__link}
                        href={link.href}>
                        {link.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default MenuList
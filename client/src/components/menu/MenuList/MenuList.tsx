import Link from "next/link"
import styles from '@/components/menu/MenuList/MenuList.module.scss'

interface ILink {
    href: string
    text: string
}

interface MenuListProps {
    className: string
    links: ILink[]
}

function MenuList({ className, links }: MenuListProps) {
    return (
        <ul className={[styles.container, className].join(' ')}>
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
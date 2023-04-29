import Image from 'next/image';
import Link from 'next/link';
import arrow from '../../../../../public/icons/arrows/arrow_right.svg';
import styles from './ArrowedLink.module.scss';

interface ArrowedLinkProps {
    text: string,
    href: string,
    onClick: (e: any) => void
}

const ArrowedLink = ({ text, href, onClick }: ArrowedLinkProps) => {
    return (
        <Link 
            className={styles.link} 
            href={href}
            onClick={(e) => onClick(e)}
        >
            <h3>{text}</h3>
            <Image className={styles.arrow} src={arrow} alt='' />
        </Link>
    )
}

export default ArrowedLink;
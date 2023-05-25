import Image from 'next/image';
import Link from 'next/link';
import arrow from '../../../../../public/icons/arrows/arrow_right.svg';
import styles from './ArrowedLink.module.scss';

interface ArrowedLinkProps {
    text: string;
    href: string;
}

const ArrowedLink = ({ text, href }: ArrowedLinkProps) => {
    return (
        <Link className={styles.link} href={href}>
            <h3>{text}</h3>
            <Image className={styles.arrow} src={arrow} alt="" />
        </Link>
    );
};

export default ArrowedLink;

import Link from 'next/link';
import styles from './ShowAllLink.module.scss';

const ShowAllLink = ({ href }: { href: string }) => {
    return (
        <Link href={href} className={styles.container}>
            <div className={styles.container__content}>Посмотреть все</div>
        </Link>
    );
};

export default ShowAllLink;

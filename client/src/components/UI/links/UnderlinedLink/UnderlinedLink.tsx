import Link from 'next/link';
import styles from './UnderlinedLink.module.scss';

interface UnderlinedLinkProps {
    text: string;
    href?: string;
}

const UnderlinedLink = ({ text, href = '' }: UnderlinedLinkProps) => {
    return (
        <Link className={styles.link} href={href}>
            {text}
        </Link>
    );
};

export default UnderlinedLink;

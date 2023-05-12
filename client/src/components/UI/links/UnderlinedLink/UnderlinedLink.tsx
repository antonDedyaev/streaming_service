import Link from 'next/link';
import styles from './UnderlinedLink.module.scss';

interface UnderlinedLinkProps {
    text: string;
    href?: string;
    /*onClick: (e: any) => void;*/
}

const UnderlinedLink = ({ text, href = '' /*, onClick */ }: UnderlinedLinkProps) => {
    return (
        <Link className={styles.link} href={href}>
            {text}
        </Link>
    );
};

export default UnderlinedLink;
/*<Link className={styles.link} href={href} onClick={(e) => onClick(e) }></Link>*/

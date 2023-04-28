import Link from 'next/link';
import styles from './UnderlinedLink.module.scss';

interface UnderlinedLinkProps {
    text: string,
    onClick: (e: any) => void
}

const UnderlinedLink = ({ text, onClick }: UnderlinedLinkProps) => {
    return (
        <Link 
            className={styles.link} 
            href=''
            onClick={(e) => onClick(e)}
        >
            {text}
        </Link>
    )
}

export default UnderlinedLink;
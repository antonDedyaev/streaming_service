import Link from 'next/link';
import styles from './TextLinkUI.module.scss';

interface TextLinkUIProps {
    href: string;
    children: React.ReactNode;
    option: 'bright' | 'dim' | 'gradient';
    className?: string
    onMouseOver?: () => void;
    onMouseOut?: () => void;
}

const TextLinkUI = ({ href, children, option, className, onMouseOver, onMouseOut }: TextLinkUIProps) => {
    return (
        <Link
            href={href}
            className={[styles.link, styles[`link_${option}`], className].join(' ')}
            onMouseOver={() => onMouseOver ? onMouseOver() : ''}
            onMouseOut={() => onMouseOut ? onMouseOut() : ''}
        >
            {children}
        </Link>
    );
};

export default TextLinkUI;

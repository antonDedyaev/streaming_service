import Link from 'next/link';
import styles from './TextLinkUI.module.scss';

interface TextLinkUIProps {
    href: string;
    children: React.ReactNode;
    option: 'bright' | 'dim' | 'gradient';
    className?: string
    onMouseOver?: () => void;
}

const TextLinkUI = ({ href, children, option, className, onMouseOver }: TextLinkUIProps) => {
    return (
        <Link
            href={href}
            className={[styles.link, styles[`link_${option}`], className].join(' ')}
            onMouseOver={() => onMouseOver ? onMouseOver() : ''}
        >
            {children}
        </Link>
    );
};

export default TextLinkUI;

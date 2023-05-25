import Link from 'next/link';
import styles from './TextLinkUI.module.scss';

interface TextLinkUIProps {
    href: string;
    children: React.ReactNode;
    option: 'bright' | 'dim' | 'gradient';
    className?: string;
    onMouseOver?: () => void;
}

const TextLinkUI = ({ href, children, option, className, onMouseOver }: TextLinkUIProps) => {
    return (
        <Link
            href={href}
            shallow
            className={[styles.container, styles[`container_${option}`], className].join(' ').trim()}
            onMouseOver={() => (onMouseOver ? onMouseOver() : '')}
        >
            {children}
        </Link>
    );
};

export default TextLinkUI;

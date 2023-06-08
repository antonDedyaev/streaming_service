import Link from 'next/link';
import styles from './TextLinkUI.module.scss';

interface TextLinkUIProps {
    href: string;
    children: React.ReactNode;
    option: 'bright' | 'dim' | 'gradient';
    className?: string;
    target?: string;
    onMouseOver?: () => void;
    onClick?: (e: any) => void;
}

const TextLinkUI = ({ href, children, option, className, onMouseOver, target, onClick }: TextLinkUIProps) => {
    return (
        <Link
            href={href}
            shallow
            target={target}
            className={[styles.container, styles[`container_${option}`], className].join(' ').trim()}
            onMouseOver={() => (onMouseOver ? onMouseOver() : '')}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default TextLinkUI;

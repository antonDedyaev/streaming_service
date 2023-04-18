import Link from 'next/link';
import styles from './TextLinkUI.module.scss';

interface TextLinkUIProps {
  href: string;
  children: React.ReactNode;
  option: 'bright' | 'dim' | 'gradient';
}

const TextLinkUI = ({ href, children, option }: TextLinkUIProps) => {
  return (
    <Link href={href} className={[styles.link, styles[`link_${option}`]].join(' ')}>
      {children}
    </Link>
  );
};

export default TextLinkUI;

import Link from 'next/link';
import styles from './SimpleLinkUI.module.scss';

interface SimpleLinkUIProps {
  href: string;
  children: React.ReactNode;
  option: 'bright' | 'dim';
}

const SimpleLinkUI = ({ href, children, option }: SimpleLinkUIProps) => {
  return (
    <Link href={href} className={[styles.link, styles[`link_${option}`]].join(' ')}>
      {children}
    </Link>
  );
};

export default SimpleLinkUI;

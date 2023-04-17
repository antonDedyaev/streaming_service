import Link from 'next/link';
import styles from './SquareCard.module.scss';
import Image from 'next/image';

/*interface mainProps {
  src?: string;
  
}*/

interface RequiredHrefProps {
  disabled?: boolean;
  href: string;
  src: string;
  mainValue?: string;
}

interface optionalHrefProps {
  disabled: boolean;
  href?: string;
  src?: string;
  mainValue: string;
}

type SquareCardProps = /*mainProps &*/ RequiredHrefProps | optionalHrefProps;

const SquareCard = ({ href = '', disabled, src, mainValue }: SquareCardProps) => {
  return (
    <Link href={href} className={[styles.link, disabled && styles[`link_disabled`]].join(' ')}>
      <div className={styles.link__content}>
        <div className={styles.link__contentImg}>
          {src && <Image src={src} alt="dd" fill></Image>}
          {mainValue && <div>{mainValue}</div>}
        </div>
      </div>
      <div>п</div>
    </Link>
  );
};

export default SquareCard;

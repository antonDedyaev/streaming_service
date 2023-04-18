import Link from 'next/link';
import styles from './SquareCard.module.scss';
import Image from 'next/image';

interface mainProps {
  caption?: string;
}

interface RequiredHrefProps {
  disabled?: boolean;
  href: string;
  src: string;
  alt: string;
  mainValue?: number;
}

interface optionalHrefProps {
  disabled: boolean;
  href?: string;
  src?: string;
  alt?: string;
  mainValue: number;
}

type SquareCardProps = mainProps & (RequiredHrefProps | optionalHrefProps);

const SquareCard = ({ href = '', disabled, src, alt = '', mainValue, caption }: SquareCardProps) => {
  return (
    <Link href={href} className={[styles.link, disabled && styles[`link_disabled`]].join(' ')}>
      <div className={styles.link__content}>
        <div className={styles.link__contentBlock}>
          {src && (
            <div className={styles.link__contentImg}>
              <Image src={src} alt={alt} fill></Image>
            </div>
          )}

          {mainValue && (
            <div
              className={[styles.link__contentRating, mainValue > 7.5 && styles[`link__contentRating_high`]].join(' ')}
            >
              {mainValue}
            </div>
          )}
        </div>
      </div>

      {caption && <div className={styles.link__caption}>{caption}</div>}
    </Link>
  );
};

export default SquareCard;

import Link from 'next/link';
import styles from './ActorItem.module.scss';
import Image from 'next/image';
import { IActor } from '../ActorList/Temp/IActor';
import { declensionOfWordFromNumber } from '../../../utils/functions';

interface ActorItemProps {
  className?: string;
  href: string;
  actor: IActor;
  role?: boolean;
  effect?: boolean;
  amt?: boolean;
  size: 'large' | 'medium' | 'small';
}

const ActorItem = ({ className, href, actor, amt, role, effect, size }: ActorItemProps) => {
  return (
    <Link href={href} className={[styles.container, className, styles[`container${size}`]].join(' ')}>
      <div
        className={[styles.imageSection, styles[`imageSection_${size}`], effect && styles['imageSection_effect']].join(
          ' ',
        )}
      >
        <div className={styles.imageActorWrapper}>
          <Image className={styles.image} src={actor.img} alt={`${actor.firstName} ${actor.lastName}`} fill />
        </div>

        {effect && (
          <div className={styles.amountBadge}>
            <div className={styles.amountBadge__backBox}></div>
            <div className={styles.amountBadge__text}>{actor.amtMovies}</div>
          </div>
        )}
      </div>
      <div className={styles.textSection}>
        <div className={[styles.textSection__title, styles[`textSection__title_${size}`]].join(' ')}>
          {actor.firstName}
        </div>
        <div className={[styles.textSection__title, styles[`textSection__title_${size}`]].join(' ')}>
          {actor.lastName}
        </div>
        {role && <div className={styles.textSection__extra}>{actor.role}</div>}
        {amt && (
          <div className={[styles.textSection__extra, styles[`textSection__extra_${size}`]].join(' ')}>
            {actor.amtMovies} {declensionOfWordFromNumber(actor.amtMovies, ['фильм', 'фильма', 'фильмов'])}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ActorItem;

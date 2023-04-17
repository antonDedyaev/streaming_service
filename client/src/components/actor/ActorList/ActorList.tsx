import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';

import { IActor } from './Temp/IActor';

interface ActorListProps {
  actors: IActor[];
  role?: boolean;
  effect?: boolean;
  amt?: boolean;
  size: 'large' | 'medium' | 'small';
}

const ActorList = ({ actors, amt, role, effect, size }: ActorListProps) => {
  return (
    <div className={styles.container}>
      {actors.map((actor) => (
        <div className={styles.actorItem}>
          <ActorItem key={actor.id} href="/" actor={actor} amt={amt} effect={effect} role={role} size={size} />
        </div>
      ))}
    </div>
  );
};

export default ActorList;

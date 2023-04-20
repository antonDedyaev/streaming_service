import { useEffect } from 'react';
import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss'
import IActor from '../../../models/IActor';

interface ActorListProps {
    actors: IActor[];
    role?: boolean;
    effect?: boolean;
    amt?: boolean;
    size?: 'large' | 'medium' | 'small';
}

const ActorList = ({ actors, amt, role, effect, size }: ActorListProps) => {
    return (
        <>
            {actors.map((actor) => (
                <ActorItem
                    key={actor.id}
                    className={styles.item}
                    href="/"
                    actor={actor}
                    amt={amt ?? true}
                    effect={effect ?? true}
                    role={role ?? true}
                    size={size ?? 'large'}
                />
            ))}
        </>
    );
};

export default ActorList;

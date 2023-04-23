import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';
import IActor from '../../../models/IActor';

interface ActorListProps {
    actors: IActor[];
    role?: boolean;
    effect?: boolean;
    amt?: boolean;
    size?: 'large' | 'medium' | 'small';
}

const ActorList = ({ actors, amt = true, role, effect = true, size = 'large' }: ActorListProps) => {
    return (
        <>
            {actors.map((actor) => (
                <ActorItem
                    key={actor.id}
                    className={styles.item}
                    href="/"
                    actor={actor}
                    amt={amt}
                    effect={effect}
                    role={role}
                    size={size}
                />
            ))}
        </>
    );
};

export default ActorList;

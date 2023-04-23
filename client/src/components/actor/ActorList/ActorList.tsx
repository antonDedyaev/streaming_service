import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';
import IActor from '../../../models/IActor';

interface ActorListProps {
    actors: IActor[];
    size: 'large' | 'medium' | 'small';
}

<<<<<<< HEAD
const ActorList = ({ actors, size }: ActorListProps) => {
=======
const ActorList = ({ actors, amt = true, role, effect = true, size = 'large' }: ActorListProps) => {
>>>>>>> 4898c7372afc067b786a92aeb7206ab31906afa5
    return (
        <>
            {actors.map((actor) => (
                <ActorItem
                    key={actor.id}
                    className={styles.item}
                    actor={actor}
                    size={size}
                />
            ))}
        </>
    );
};

export default ActorList;

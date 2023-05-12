import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';
import IActor from '../../../models/IActor';

interface ActorListProps {
    actors: IActor[];
    size: 'large' | 'medium' | 'small';
}

const ActorList = ({ actors, size }: ActorListProps) => {
    return (
        <>
            {actors.map((actor) => (
                <ActorItem
                    key={actor.id}
                    className={[styles.item, styles[`item_${size}`]].join(' ')}
                    actor={actor}
                    size={size}
                />
            ))}
        </>
    );
};

export default ActorList;

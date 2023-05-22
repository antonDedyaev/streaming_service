import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';
import IPerson from '../../../models/IPerson';

interface ActorListProps {
    actors: IPerson[];
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

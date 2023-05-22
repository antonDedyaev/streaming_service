import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';
import IPerson from '../../../models/IPerson';

interface ActorListProps {
    persons: IPerson[];
    size: 'large' | 'medium' | 'small';
}

const ActorList = ({ persons, size }: ActorListProps) => {
    return (
        <>
            {persons.map((person) => (
                <ActorItem
                    key={person.id}
                    className={[styles.item, styles[`item_${size}`]].join(' ')}
                    person={person}
                    size={size}
                />
            ))}
        </>
    );
};

export default ActorList;

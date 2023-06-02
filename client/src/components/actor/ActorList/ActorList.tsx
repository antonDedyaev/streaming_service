import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';
import IPerson from '../../../models/IPerson';

interface ActorListProps {
    persons: IPerson[];
    size: 'large' | 'medium' | 'small';
    closeModal?: (close: boolean) => void;
}

const ActorList = ({ persons, size, closeModal }: ActorListProps) => {
    const close = (value: boolean) => {
        closeModal?.(value);
    };

    return (
        <>
            {persons.map((person) => (
                <ActorItem
                    key={`${person.id}${size}`}
                    className={[styles.item, styles[`item_${size}`]].join(' ')}
                    person={person}
                    size={size}
                    closeModal={close}
                />
            ))}
        </>
    );
};

export default ActorList;

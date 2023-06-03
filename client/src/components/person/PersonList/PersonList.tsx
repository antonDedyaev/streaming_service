import PersonItem from '../PersonItem/PersonItem';
import styles from './PersonList.module.scss';
import IPerson from '../../../models/IPerson';

interface PersonListProps {
    persons: IPerson[];
    size: 'large' | 'medium' | 'small';
    closeModal?: (close: boolean) => void;
}

const PersonList = ({ persons, size, closeModal }: PersonListProps) => {
    const close = (value: boolean) => {
        closeModal?.(value);
    };

    return (
        <>
            {persons.map((person) => (
                <PersonItem
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

export default PersonList;

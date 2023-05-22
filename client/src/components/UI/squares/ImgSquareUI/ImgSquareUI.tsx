import Image from 'next/image';
import styles from './ImgSquareUI.module.scss';
import IPerson from '@/models/IPerson';

interface ImgSquareUIProps {
    person: IPerson;
    border?: 'medium' | 'small';
}

const ImgSquareUI = ({ person, border = 'small' }: ImgSquareUIProps) => {
    return (
        <Image
            className={[styles.image, border === 'medium' ? styles.image_medium : ''].join(' ').trim()}
            src={person.photo}
            alt={person.name}
            height={300}
            width={300}
        ></Image>
    );
};

export default ImgSquareUI;

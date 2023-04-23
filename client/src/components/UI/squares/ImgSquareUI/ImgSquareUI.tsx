import Image from 'next/image';
import styles from './ImgSquareUI.module.scss';
import IActor from '../../../../models/IActor';

interface ImgSquareUIProps {
    actor: IActor;
    border?: 'medium' | 'small';
}

const ImgSquareUI = ({ actor, border = 'small' }: ImgSquareUIProps) => {
    return (
        <Image
            className={[styles.image, border === 'medium' ? styles.image_medium : ''].join(' ').trim()}
            src={actor.img}
            alt={actor.firstName}
            fill
        ></Image>
    );
};

export default ImgSquareUI;

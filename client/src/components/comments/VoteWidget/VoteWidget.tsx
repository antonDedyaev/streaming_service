import Image from 'next/image';
import TransparentButton from '../../UI/buttons/TransparentButton/TransparentButton';
import like from '../../../../public/icons/like.png';
import dislike from '../../../../public/icons/dislike.png';
import styles from './VoteWidget.module.scss';

const VoteWidget = ({ votes = 10 }) => {
    return (
        <div className={styles.container} data-testid={'voteWidget'}>
            <TransparentButton textColor="bright" className={[styles.button, styles.button_dislike].join(' ')}>
                <Image className={styles.button__image} src={dislike} alt="dislike" />
            </TransparentButton>
            <div className={styles.container__votes}>{votes}</div>
            <TransparentButton textColor="bright" className={[styles.button, styles.button_like].join(' ')}>
                <Image className={styles.button__image} src={like} alt="like" />
            </TransparentButton>
        </div>
    );
};

export default VoteWidget;

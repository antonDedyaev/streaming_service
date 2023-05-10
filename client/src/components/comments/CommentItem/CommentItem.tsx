import IComment from '@/models/IComment';
import styles from './CommentItem.module.scss';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import VoteWidget from '../VoteWidget/VoteWidget';

interface CommentItemProps {
    comment: IComment
}

const CommentItem = ({ comment }: CommentItemProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <div className={styles.container__info}>
                    <p className={styles.container__username}>{comment.user}</p>
                    <time className={styles.container__date} dateTime={comment.date}>{comment.date}</time>
                </div>
                <VoteWidget />
            </div>

            <div className={styles.container__content}>
                <SpoilerUI toggleButtonTexts={['Развернуть', 'Свернуть']}>
                    <div className={styles.container__text}>{comment.text}</div>
                </SpoilerUI>
            </div>

            <div className={styles.container__actions}>
                <BorderedButton
                    className={styles.container__button}
                    size="small"
                >
                    Ответить
                </BorderedButton>
            </div>
        </div>
    )
}

export default CommentItem;
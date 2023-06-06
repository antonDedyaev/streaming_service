import IComment from '@/models/IComment';
import styles from './CommentItem.module.scss';
import VoteWidget from '../VoteWidget/VoteWidget';
import { useTranslation } from 'next-i18next';
import TransparentButton from '@/components/UI/buttons/TransparentButton/TransparentButton';
import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import { formatDate } from '@/utils/functions';

interface CommentItemProps {
    comment: IComment;
    handleReply: (value: string) => void;
}

const CommentItem = ({ comment, handleReply }: CommentItemProps) => {
    const { t } = useTranslation('movie');
    const [formShown, setFormShown] = useState<boolean>(false);

    const handleClick = () => {
        setFormShown(!formShown);
    }

    const handleSubmit = (value: string) => {
        console.log(value)
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <div className={styles.container__info}>
                    <p className={styles.container__username}>{comment.user}</p>
                    <time className={styles.container__date} dateTime={comment.date}>{formatDate(comment.date)}</time>
                </div>
                <VoteWidget />
            </div>

            <div className={styles.container__content}>
                <div className={styles.container__text}>{comment.text}</div>
            </div>

            {comment.childComment &&
                <div className={styles.container__actions}>
                    <TransparentButton
                        className={styles.container__button}
                        textColor='faded'
                        onClick={handleClick}
                    >
                        {t('comments.reply')}
                    </TransparentButton>
                </div>
            }

            {formShown && <CommentForm onSubmit={handleReply} />}
        </div>
    )
}

export default CommentItem;